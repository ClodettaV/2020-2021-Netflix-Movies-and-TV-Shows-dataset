# 2020-2021 Netflix Movies and TV Shows dataset
## Overview

We have created a dashboard using Flask in order to analyze the correlation between the use of Netflix and its audience. The goal is to better understand and personalize content based on key factors such as age and type of show. 

Questions we want to answer:
1.	What is the most targeted audience?
2.	Are movies watched more than tv series?
3.	What is the number of tv shows and movies produced through the years?
4.	What is the number of maturity rating for tv shows and movies?
5.	In what countries movies/shows are mainly produced?

The flask application runs on: https://
Below are screenshots of what the app looks like when running:

### Index Page
...
...
...
Plotly JS was used to render the data onto the page by querying the API endpoints created.


This page was created by rendering markdown using Python Markdown.

### Report Pages

### API page
API docs were created using Flask RESTX.

## Running locally

1. Freeze pip / conda requirements
python -m pip list --format=freeze > requirements.txt

2. Create the environment using
conda create -n <env> --file requirements.txt

3.Run the app using:
python app.py

OR

flask run
  
  
  
  
## Deploying to Heroku
Freeze pip / conda requirements

python -m pip list --format=freeze > requirements.txt
Create/Update Procfile to use gunicorn to run the web server and set app.py as the application to run:

web: gunicorn app:app
Create/Update runtime.txt to contain:

python-3.7.10
