# MicroBricks
MicroBricks is a PERN (PostgreSQL, Express, React and Node) stack web app for closed-source web scraping framework _MultiScrape_.  
Its search feature allows users to look through product databases and visualize aggregated data using _Chart.js_ charts.

Homepage top               |  Homepage bottom w/ chart
:-------------------------:|:-------------------------:
![Homepage top](https://user-images.githubusercontent.com/44974658/111075807-f3f38000-84e9-11eb-9d31-5076a600802f.png) |  ![Homepage bottom](https://user-images.githubusercontent.com/44974658/111075862-28673c00-84ea-11eb-9e2e-e06569763d37.png)

## Features
- Search engine for PostgreSQL product database
- Include charts created by _Chart.js_ framework for price and quantity history
- Use filter and sort options to further narrow down search

## Installation
Simply use `git clone https://github.com/yzwetsloot/microbricks.git` to clone this repository to your local machine.

## Configuration
Client uses `config.js` file to specify special configuration parameters (such as how many products should be rendered per page).  
Server uses `.env` file to specify environment variables, such as listening port, database configuration etc.

## Usage
#### Client
- `npm install`: installs dependencies
- `npm run start`: start React's built-in development server
- `npm run build`: create `build` folder which will be used by Express to serve static files

#### Server
- `npm install`: installs dependencies
- `npm run start`: run Express server
- `npm run server`: run Express server using [nodemon](https://www.npmjs.com/package/nodemon)

#### Docker
- `docker build -t microbricks .`
- `docker run -d --name microbricks-app -p 80:80 microbricks` (include `--net=host` if attempting to connect to host machine)

## Notes
- Project is still in development

<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
