npm install pm2 -g
npm i serve -g
pm2 --name MinachanserServer start "python3 antagningsstatistik_webscraper.py" "serve -p 80 react-spa/build"

