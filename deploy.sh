npm install pm2 -g
npm i serve -g
sudo apt install python3.8 -y
pm2 --name MinachanserServer start "antagningsstatistik_webscraper.py" "serve -p 80 react-spa/build"

