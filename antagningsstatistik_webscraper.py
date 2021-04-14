from urllib.request import urlopen
from bs4 import BeautifulSoup
print('test')

url = "http://www.xn--antagningspong-hib.se/karolinska-institutet/lakarprogrammet"
page = urlopen(url)
html = page.read().decode("utf-8")
soup = BeautifulSoup(html, "html.parser")
print('test')

titles = soup.find_all('h2')
rows = soup.find_all('tr')

data_rows_list = []
header_row = []

for row in rows:
    if len(row.find_all('td')) > 0:
        data_rows_list.append([item.text for item in row.find_all('td')])
    elif len(row.find_all('th')) > 0:
        if len(header_row) is 0:
            header_row = [item.text for item in row.find_all('th')]

print(header_row)

