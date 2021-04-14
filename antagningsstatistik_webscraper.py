from urllib.request import urlopen
from bs4 import BeautifulSoup
import json
import os.path
import logging

logging.basicConfig(format='%(asctime)s %(message)s', datefmt='%m/%d/%Y %I:%M:%S %p', encoding='utf-8', 
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


get_program_data(url)