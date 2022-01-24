# 2020-2021 Netflix Movies and TV Shows dataset
## Overview

We have created a dashboard using Flask in order to analyze the correlation between the use of Netflix and its audience. The goal is to better understand and personalize content based on key factors such as age and type of show. 

Questions we want to answer:
1.  What are the most popular directors on Netflix?
2.	What is the most targeted audience?
3.	Are movies watched more than tv shows?
4.	In what countries movies/shows are mainly produced?
5.	How does the number of released movies compare to number of released tv shows through the years?

The flask application runs on: https://
Below are screenshots of what the app looks like when running:

### Index Page
![image (1)](https://user-images.githubusercontent.com/88614132/150798482-ec6c3fcd-c7f6-471c-9b47-202eb68e856f.png)

Plotly JS and Leaflet were used to render the data onto the page by querying the API endpoints created.

### Data page
![image (2)](https://user-images.githubusercontent.com/88614132/150798718-8bf90e34-dc7e-4a61-9118-80a7018de81c.png)






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
1. Freeze pip / conda requirements
 python -m pip list --format=freeze > requirements.txt
  
2. Create/Update Procfile to use gunicorn to run the web server and set app.py as the application to run:
 web: gunicorn app:app
  
3. Create/Update runtime.txt to contain:
 python-3.7.10
