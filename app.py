from flask import Flask, session, request, redirect, render_template, Blueprint, jsonify
from flask_restx import Api, Resource, fields
from flask_restful import Api, Resource, fields
import pandas as pd
import numpy as np

import os
from os import listdir
from os.path import isfile, join

import json
from geojson import Feature, FeatureCollection, Point

import pickle
import markdown as md

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask_sqlalchemy import SQLAlchemy

from convert2geojson import Convert2GeoJson


# database setup 

# df = pd.read_csv("netflix_movies_tvshows.csv")


# flask app setup
app = Flask(__name__)

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///Netflix_moviesandTvshows.sqlite"
# db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
# NETFLIX=Base.prepare(engine, reflect=True)


# class mytable(db.Model):
#     __tablename__ = 'netflix'
#     show_id = db.Column(db.String, primary_key=True)
#     type = db.Column(db.String)
#     title = db.Column(db.String)
#     release_year = db.Column(db.Integer)
    # quantity = db.Column(db.Integer)
    # price = db.Column(db.Float)
    # updated = db.Column(db.String)

# NETFLIX = Base.classes.mytable


# metricMapper = {
#     "revenue": "Revenue",
#     "cost": "Product cost",
#     "profit": "Gross profit"
# }

def df_to_geojson(df, properties, lat='latitude', lon='longitude'):
    # create a new python dict to contain our geojson data, using geojson format
        geojson = {'type':'FeatureCollection', 'features':[]}

    # loop through each row in the dataframe and convert each row to geojson format
        for _, row in df.iterrows():
        # create a feature template to fill in
            feature = {'type':'Feature',
                   'properties':{},
                   'geometry':{'type':'Point',
                               'coordinates':[]}}

        # fill in the coordinates
            feature['geometry']['coordinates'] = [row[lon],row[lat]]

        # for each column, get the value and add it as a new feature property
            for prop in properties:
                feature['properties'][prop] = row[prop]
        
        # add this feature (aka, converted dataframe row) to the list of features inside our dict
            geojson['features'].append(feature)
    
        return geojson


@app.route("/")
def index():
    engine = create_engine("sqlite:///Netflix_moviesandTvshows.sqlite")
    conn= engine.connect()
    yearsdf = pd.read_sql("select distinct release_year from netflix ",conn)
    years = yearsdf["release_year"].sort_values(ascending=False).to_list()
    return render_template("index.html", years = years)

@app.route("/director/<year>/<type>")
def directorgroup(year,type):
    engine = create_engine("sqlite:///Netflix_moviesandTvshows.sqlite")
    conn= engine.connect()
    sqldata = pd.read_sql("select * from netflix ",conn)
    df = pd.DataFrame(sqldata)
    grouped= df[(df["release_year"].isin(map(int,year.split(','))))&(df["type"].isin(type.split(',')))].groupby(["director"]).count().sort_values("title",ascending=False)["title"].reset_index()[0:10]
    jsondata = grouped.to_json(orient="records")

    return jsondata

@app.route("/rating/<year>/<type>")
def ratinggroup(year,type):
    engine = create_engine("sqlite:///Netflix_moviesandTvshows.sqlite")
    conn= engine.connect()
    sqldata = pd.read_sql("select * from netflix ",conn)
    df = pd.DataFrame(sqldata)
    grouped= df[(df["release_year"].isin(map(int,year.split(','))))&(df["type"].isin(type.split(',')))].groupby(["rating"]).count().sort_values("title",ascending=False)["title"].reset_index()[0:10]
    jsondata = grouped.to_json(orient="records")

    return jsondata

@app.route("/type/<year>/<type>")
def typegroup(year,type):
    engine = create_engine("sqlite:///Netflix_moviesandTvshows.sqlite")
    conn= engine.connect()
    sqldata = pd.read_sql("select * from netflix ",conn)
    df = pd.DataFrame(sqldata)
    grouped= df[(df["release_year"].isin(map(int,year.split(','))))&(df["type"].isin(type.split(',')))].groupby(["type"]).count().sort_values("title",ascending=False)["title"].reset_index()[0:10]
    jsondata = grouped.to_json(orient="records")
    
    return jsondata

@app.route("/year/<year>/<type>")
def yeargroup(year,type):
    engine = create_engine("sqlite:///Netflix_moviesandTvshows.sqlite")
    conn= engine.connect()
    sqldata = pd.read_sql("select * from netflix ",conn)
    df = pd.DataFrame(sqldata)
    grouped= df[(df["release_year"].isin(map(int,year.split(','))))&(df["type"].isin(type.split(',')))].groupby(["release_year"]).count().sort_values("title",ascending=False)["title"].reset_index()[0:10]
    jsondata = grouped.to_json(orient="records")

    return jsondata

# @app.route("/country/<year>/<type>")
# def countrygroup(year,type):
#     engine = create_engine("sqlite:///Netflix_moviesandTvshows.sqlite")
#     conn= engine.connect()
#     sqldata = pd.read_sql("select * from netflix ",conn)
#     df = pd.DataFrame(sqldata)
#     df2 = pd.read_csv("countries.csv")
#     df2=df2[['COUNTRY','longitude','latitude']]
#     df2=df2.rename(columns={"COUNTRY": "country"})
#     df=df.merge(df2, on='country', how='left')
#     grouped= df[(df["release_year"].isin(map(int,year.split(','))))&(df["type"].isin(type.split(',')))].groupby(["country"]).count().sort_values("title",ascending=False)["title"].reset_index()
#     jsondata = grouped.to_json(orient="records")
    
#     return jsondata

@app.route("/country/<year>/<type>")
def countrygroup(year,type):
    engine = create_engine("sqlite:///Netflix_moviesandTvshows.sqlite")
    conn= engine.connect()
    sqldata = pd.read_sql("select * from netflix ",conn)
    df = pd.DataFrame(sqldata)
    df2 = pd.read_csv("countries.csv")
    df2=df2[['COUNTRY','longitude','latitude']]
    df2=df2.rename(columns={"COUNTRY": "country"})
    # df2['longitude'] = df2['longitude'].astype(float)
    # df2['latitude'] = df2['latitude'].astype(float)
    
    grouped= df[(df["release_year"].isin(map(int,year.split(','))))&(df["type"].isin(type.split(',')))].groupby(["country"]).count().sort_values("title",ascending=False)["title"].reset_index()
    grouped=grouped.merge(df2, on='country', how='left')
    grouped['longitude'] = grouped['longitude'].fillna(0)
    grouped['latitude'] = grouped['latitude'].fillna(0)

    data = Convert2GeoJson(grouped,grouped.columns,lat="latitude",lon="longitude").convert().geojson()
    # data.convert()
    # result=data.geojson()

    # features = grouped.apply(
    #     lambda row: Feature(geometry=Point((float(row['longitude']), float(row['latitude'])))),
    #     axis=1).tolist()


# all the other columns used as properties
    # properties = df.drop(['latitude', 'longitude'], axis=1).to_dict('records')

# whole geojson object
    # feature_collection = FeatureCollection(features=features, properties=properties)
    
    
    # cols = ['show_id','type','title','director','cast','date_added','release_year','rating','duration','listed_in','description']
    # newgeojson = df_to_geojson(grouped, cols)

    # jsondata = grouped.to_json(orient="records")
    return     data


    # return feature_collection  
    # return newgeojson    

# @app.route("/inventory/<release_year>")
# def inventory(release_year):
#         stuff = mytable.query.filter_by(release_year=release_year).order_by(mytable.show_id).all()
#         sock_text = '<ul>'
#         for sock in stuff:
#             sock_text += '<li>' + sock.show_id + ', ' + str(sock.release_year) + '</li>'
#         sock_text += '</ul>'
#         return render_template("index.html",stuff=stuff, release_year=release_year )





# @app.route("/NETFLIX/<release_year>")
# def netflix(release_year):
#     sel = [
#         NETFLIX.show_id,
#         NETFLIX.type,
#         NETFLIX.title,
#         NETFLIX.release_year,

#     ]

#     results = db.session.query(*sel).filter(NETFLIX.release_year == release_year).all()

#     Netflix={}
#     for result in results:
#         Netflix["show_id"]=result[0]
#         Netflix["type"]=result[1]
#         Netflix["title"]=result[2]
#         Netflix["release_year"]=result[3]
#     print(Netflix)
#     return jsonify(Netflix)


# @app.route("/api/release_year")
# def names():
#     results = [
#         {
#             "show_id": list(row)[0],
#             "type": list(row)[1],
#             "title": list(row)[2],
#             "director": list(row)[3],
#             "cast": list(row)[4],
#             "country": list(row)[5],
#             "release_year": list(row)[7],
#             "rating": list(row)[8],
#             "listed_in": list(row)[9],
#             "description": list(row)[10]
        
#         } for row in engine.execute("select * from netflix")]

#     return {"netflix":results}



# # Route for map
# @app.route("/map")
# def map():
#    return render_template("map.html")

# @app.route("/titlesByDirector/<metric>/<years>")
# class titlesByDirector(Resource):
#     def get(self, metric, years):
#         return df[df["release_year"].isin(map(int, years.split(",")))].groupby(by=["release_year"]).sum()[metricMapper[metric]].to_dict()

# def chart():
#    return render_template("chart.html")

# @app.route("/samples/<show_id>")
# def samples(show_id):
#     """Return `otu_ids`, `otu_labels`,and `sample_values`."""
#     stmt = db.session.query(netflix).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

#     # Filter the data based on the sample number and
#     # only keep rows with values above 1
#     sample_data = df.loc[df[show_id] > 1, ["otu_id", "otu_label", show_id]]
#     sample_data.sort_values(show_id, axis=0, ascending=False, inplace=True)
#     # Format the data to send as json
#     data = {
#         "otu_ids": sample_data.otu_id.values.tolist(),
#         "sample_values": sample_data[show_id].values.tolist(),
#         "otu_labels": sample_data.otu_label.tolist(),
#     }
#     return jsonify(data)


    
# Route to get all the Electric Vehicle Charging Stations data.
# Read data from Stations table in json format and return it to the browser.
# @app.route("/stations")
# def getAllStations():
#     conn = engine.connect()
#     query = f"select state,station_name, latitude, longitude, open_date from Stations"
#     df = pd.read_sql(query, conn)
#     stations = df.to_json(orient="records")
    
#     return stations
#     #return render_template("stations.html")

# @app.route("/emissions")
# def getAllEmissions():
#     conn = engine.connect()
#     query = f"select * from netflix"
#     df = pd.read_sql(query, conn)
#     emissions = df.to_json(orient="records")
    
#     return {"netflix":emissions}

if __name__ == '__main__':
    app.run(debug=True)
