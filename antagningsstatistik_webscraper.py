from urllib.request import urlopen
from bs4 import BeautifulSoup
import json
import os.path
import logging
from urllib.parse import urlencode

logging.basicConfig(format='%(asctime)s %(message)s', datefmt='%m/%d/%Y %I:%M:%S %p', 
level=logging.INFO, handlers=[logging.FileHandler("events.log"), logging.StreamHandler()])





url = "http://www.xn--antagningspong-hib.se/karolinska-institutet/lakarprogrammet"


# Function that returns the UNIVERSITY program data. First it checks if data about the university has been downloaded
# in the past (local data might be outdated. Delete files in program_data folder in order to refresh to newest data)
# If data about the university program has not been found locally, it will webscrape it from antagningspoäng.se and save 
# the data in the program_data folder. Filename will be basically be the url path to the original data from 
# antagningspoäng.se. Events will be logged in events.log
def get_program_data(url):
    program_file_name = url.split("antagningspong-hib.se/")[1].replace("/", "_") + ".json"
    program_file_path = "program_data/" + program_file_name

    program_data = None

    if os.path.isfile(program_file_path):
        # Local data exists
        logging.info('File exists: ' + program_file_name)
        with open(program_file_path, "r") as json_file:
            program_data = json.load(json_file)
            return program_data
    else:
        # Local data does not exist
        page = urlopen(url)
        html = page.read().decode("utf-8")
        soup = BeautifulSoup(html, "html.parser")

        semesters = [item.text for item in soup.find_all('h2')]
        rows = soup.find_all('tr')

        data_rows_list = []
        data_headers = []

        for row in rows:
            if len(row.find_all('td')) > 0:
                data_rows_list.append([item.text for item in row.find_all('td')])
            elif len(row.find_all('th')) > 0:
                if len(data_headers) == 0:
                    data_headers = [item.text for item in row.find_all('th')][1:]

        program, school = [item.strip() for item in soup.find_all('h1')[0].text.split("Antagningspoäng för")[1].split("vid")]


        urval_1s = [data_rows_list[x * 2][1:] for x in range(len(semesters))]
        urval_2s = [data_rows_list[x * 2 + 1][1:] for x in range(len(semesters))]

        admission_data = []
        for x in range(len(semesters)):
            semester_data = {
                "semester": semesters[x],
                "urval 1": {
                    "BI": urval_1s[x][0],
                    "BII": urval_1s[x][1],
                    "HP": urval_1s[x][2],
                    "SA": urval_1s[x][3],
                    "BF": urval_1s[x][4]
                },
                "urval 2": {
                    "BI": urval_2s[x][0],
                    "BII": urval_2s[x][1],
                    "HP": urval_2s[x][2],
                    "SA": urval_2s[x][3],
                    "BF": urval_2s[x][4]
                }
            }
            admission_data.append(semester_data)

        program_data = {
            "url": url,
            "school": school,
            "program": program,
            "admission_data": admission_data
        }

        with open(program_file_path, "w") as json_file:
            json.dump(program_data, json_file)
        logging.info('Created file: ' + program_file_name)

# Function that takes in a search string and uses 
# webscraping off of antagningspoängs search to return 
# a dictionary with the search results.
def search_for_programs(query_string):
    q_dict = {'q': query_string}
    encoded_query = urlencode(q_dict)

    query_url = "http://xn--antagningspong-hib.se/?" + encoded_query
    
    page = urlopen(query_url)
    html = page.read().decode("utf-8")
    soup = BeautifulSoup(html, "html.parser")

    headers = [item.text for item in soup.find_all('th')]
    results = [[x.text for x in item.find_all('td')] for item in soup.find_all('tr')]
    
    urls = [item.find_all('a')[0]['href'] for item in soup.find_all('td') if len(item.find_all('a'))>0]
    program_urls = [urls[x*2] for x in range(len(results))]

    query_results = {
        "results": [{
            "program": results[x][0],
            "school": results[x][1],
            "BI": results[x][2],
            "BII": results[x][3],
            "HP": results[x][4],
            "url": program_urls[x],
        } for x in range(len(results))]
    }

    return query_results


get_program_data(url)
print(search_for_programs("Karolinska läkarprogrammet")["results"][0])

