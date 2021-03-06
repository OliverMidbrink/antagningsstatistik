from urllib.request import urlopen
from bs4 import BeautifulSoup
import json
import os.path
import os
import logging
from urllib.parse import urlencode
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
import requests
import datetime
from datetime import date
import time
import random



logging.basicConfig(format='%(asctime)s %(message)s', datefmt='%m/%d/%Y %I:%M:%S %p', 
level=logging.INFO, handlers=[logging.FileHandler("events.log"), logging.StreamHandler()])


# Function that returns the UNIVERSITY program data. First it checks if data about the university has been downloaded
# in the past (local data might be outdated. Delete files in program_data folder in order to refresh to newest data)
# If data about the university program has not been found locally, it will webscrape it from antagningspoäng.se and save 
# the data in the program_data folder. Filename will be basically be the url path to the original data from 
# antagningspoäng.se. Events will be logged in events.log
def get_program_data(kurskod_ht, school, program):
    current_year = datetime.datetime.now().year

    # Load data if already exists
    file_name = "./program_data/" + kurskod_ht + ".json"

    if os.path.exists(file_name):  
        data_is_outdated = False

        with open(file_name, "r") as file:
            program_data_json = json.load(file)
            print("Reading from file")

            # Try getting the latest data and compare to the current date
            try:
                latest_year_HT_in_local_data = program_data_json["HT"][0][0]
                if date(current_year, 8, 5) > date(latest_year_HT_in_local_data, 8, 5):
                    # New data is out (given that the education program still exists)
                    data_is_outdated = True

            except:
                print("Latest HT not found")

            try:
                latest_year_VT_in_local_data = program_data_json["VT"][0][0]
                if date(current_year, 12, 30) > date(latest_year_HT_in_local_data, 12, 30):
                    # New data is out (given that the education program still exists)
                    data_is_outdated = True
            except:
                print("Latest HT not found")

            if not data_is_outdated:
                return program_data_json
        
        if data_is_outdated:
            try:
                # Create target Directory
                os.mkdir("./archived_program_data/")
            except FileExistsError:
                pass
            os.rename(file_name, './archived_program_data/' + kurskod_ht + '.json')

    kurskod_vt = -1

    # Search for VT kurskod
    query_object = {"tillfalle":'Sokande',
    'vy':'Total',
    'antagningsomgang':'VT' + str(current_year),
    'larosateId':'',
    'utbildningstyp':'',
    'fritextFilter':program + " " + school,
    'urvalsGrupp':'','firstResult':'0','maxResults':'100','sorteringsKolumn':'1','sorteringsOrdningDesc':'false',
    'requestNumber':'1','paginate':'true'}

    query_object = json.dumps(query_object)

    q_dict = {'request': query_object}
    encoded_query = urlencode(q_dict)

    query_url = "https://statistik.uhr.se/rest/stats/tableData?" + encoded_query
    response = requests.get(query_url, verify=False)
    
    for result in response.json()["aaData"]:
        if result[2] == program and result[4] == school:
            kurskod_vt = result[3]
            print(kurskod_vt)


    # Some schools reuse course id for different time periods. Like use for one course, then after some years use the same code for another course
    # This can cause confusing data results if not handled properly
    earliest_year_read_successfully = current_year
    should_break = False

    program_data = {"VT": [], "HT": [], "comment":""}
    kurskoder = {"HT": kurskod_ht, "VT": kurskod_vt}

    # Add comments here for notes to the user about a certain education
    if kurskod_ht == "HHS-34002" or kurskod_ht == 'HHS-34004':
        program_data["comment"] = "Tänk på att handelshögskolan ej räknar med meritpoäng! Lägg därför inte till din meritpoäng i detta verktyg."

    for year in range(current_year, current_year-6, -1):
        for semester in ["VT", "HT"]:
            if should_break or (semester == "VT" and kurskod_vt == -1):
                continue
            
            # Wait a moment before reading so as to not spam the data server
            time.sleep(random.random() / 8)


            query_object = {"tillfalle":'Urval2',
            'vy':'Antagningspoang',
            'antagningsomgang':semester + str(year),
            'larosateId':'',
            'utbildningstyp':'',
            'fritextFilter':school, ## DANGER MIGHT BREAK THE PROGRAM!!!
            'urvalsGrupp':'','firstResult':'0','maxResults':'10000','sorteringsKolumn':'1','sorteringsOrdningDesc':'false',
            'requestNumber':'1','paginate':'true'}

            query_object = json.dumps(query_object)

            q_dict = {'request': query_object}
            encoded_query = urlencode(q_dict)

            query_url = "https://statistik.uhr.se/rest/stats/tableData?" + encoded_query
            print(query_url)
            response = requests.get(query_url, verify=False)

            semester_data = response.json()["aaData"]

            # IF three years without use of this coursecode has gone by, stop reading for more data for efficiency
            if earliest_year_read_successfully - year > 2:
                print("Empty years, aborting")
                should_break = True
                break

            
            semester_list = [year, semester]
            
            admission_data_points = {'BI': 'Not Found', 'BII':'Not Found', 'HP': 'Not Found'}
            for row in semester_data:
                #print(row)
                # Skip if the row is not from the requested school
                if row[4] != school:
                    #print("wrong school")
                    continue
                
                # skip if it is not the requested program or course code
                if kurskoder[semester] != row[3] and row[2] != program:
                    #print("wrong code or program name")
                    continue

                print(row)
                if row[5] == 'BI' or row[5] == 'HP' or row[5] == 'BII':
                    admission_data_points[row[5]] = row[6]
                    #print(admission_data_points)

                # for HHS and company
                if row[5] == 'HJ':
                    admission_data_points['HP'] = row[6]
                
                if row[5][:2] == 'HP':
                    admission_data_points['HP'] = row[6]

            print(semester_list)
            
            semester_list.append(admission_data_points['BI'])
            semester_list.append(admission_data_points['BII'])
            semester_list.append(admission_data_points['HP'])

            # skip if there is no relevant data
            if len(semester_data) == 0 or (admission_data_points['BI'] == 'Not Found' and admission_data_points['HP'] == 'Not Found'):
                continue
            
            print(semester_list)
            program_data[semester].append(semester_list)
            earliest_year_read_successfully = year
    
    
    with open(file_name, "w+") as file:
        print("Saving: " + json.dumps(program_data))
        json.dump(program_data, file)
    

    return program_data

# Function that takes in a search string and uses 
# webscraping off of antagningspoängs search to return 
# a list with the search results.
def search_for_programs(query_string):
    current_year = datetime.datetime.now().year

    query_object = {"tillfalle":'Sokande',
    'vy':'Total',
    'antagningsomgang':'HT' + str(current_year),
    'larosateId':'',
    'utbildningstyp':'p',
    'fritextFilter':query_string,
    'urvalsGrupp':'','firstResult':'0','maxResults':'40','sorteringsKolumn':'1','sorteringsOrdningDesc':'false',
    'requestNumber':'1','paginate':'true'}

    query_object = json.dumps(query_object)

    q_dict = {'request': query_object}
    encoded_query = urlencode(q_dict)

    query_url = "https://statistik.uhr.se/rest/stats/tableData?" + encoded_query
    response = requests.get(query_url, verify=False)
    
    return {"results": response.json()["aaData"]}


#print(get_program_data("HHS-34002", "Handelshögskolan i Stockholm", "Bachelor of Science Program in Business and Economics"))
#print(get_program_data("GU-1G74A", "Göteborgs universitet", "Psykologprogrammet"))


app = Flask(__name__)
CORS(app)
api = Api(app)

class Query(Resource):
    def get(self):
        args = request.args
        results = search_for_programs(args['q'])
        return json.dumps(results)

# TODO finish
class Program_data(Resource):
    def get(self):
        args = request.args
        results = get_program_data(args['q'], args['school'], args['program'])
        return json.dumps(results)

# Query takes a q with a search query string
# Program_data takes a q with a url to a program
api.add_resource(Query, '/query') # Api server on port 5002
api.add_resource(Program_data, '/program_data')

if __name__ == '__main__':
    app.run(host="68.183.10.8", port='5002')

