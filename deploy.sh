npm install pm2 -g
npm i serve -g
npm install
pm2 --name MinachanserServer start "python3 antagningsstatistik_webscraper.py" "serve -p 80 -d react-spa/build"
