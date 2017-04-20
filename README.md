# Creative Code Immersive Starter Kit

This repository contains a simple setup for developing sketches using P5.js served by a Node.js web app.

## Quick Start

1. Download and install the free Docker Community Edition for your operating system:

| Operating System | Download link |
| :--- | :--- |
| Docker for Mac | https://store.docker.com/editions/community/docker-ce-desktop-mac |
| Docker for Windows | https://store.docker.com/editions/community/docker-ce-desktop-windows |

2. Clone this repo to your computer using the **Clone or download** button on this repo's page. Click on **Open in Desktop** to use the Github Desktop app.

3. Open a Terminal and navigate to the repo on your computer. Github Desktop shortcut: right-click on the repo in the list, and select **Open in Terminal**.

4. In the Terminal window, start the server using Docker Compose by typing the following command:

```
$ docker-compose up
Creating network "ccimmersivestarterkit_default" with the default driver
Pulling server (francisli/ccimmersive-starter-kit:latest)...
...
Status: Downloaded newer image for francisli/ccimmersive-starter-kit:latest
Creating ccimmersivestarterkit_server_1
Attaching to ccimmersivestarterkit_server_1
server_1  | stdin: is not a tty
server_1  | yarn start v0.22.0
server_1  | $ if [ "$NODE_ENV" = "production" ]; then node ./server/bin/www; else gulp; fi 
server_1  | [23:05:47] Using gulpfile /opt/node/app/gulpfile.js
server_1  | [23:05:47] Starting 'serve'...
server_1  | [23:05:48] Finished 'serve' after 363 ms
server_1  | [23:05:48] Starting 'default'...
server_1  | [23:05:48] Finished 'default' after 47 μs
server_1  | [BS] Proxying: http://localhost:7080
server_1  | [BS] Access URLs:
server_1  |  -----------------------------------
server_1  |        Local: http://localhost:8080
server_1  |     External: http://172.25.0.2:8080
server_1  |  -----------------------------------
server_1  |           UI: http://localhost:3001
server_1  |  UI External: http://172.25.0.2:3001
server_1  |  -----------------------------------
server_1  | [23:05:48] [nodemon] 1.11.0
server_1  | [23:05:48] [nodemon] to restart at any time, enter `rs`
server_1  | [23:05:48] [nodemon] watching: /opt/node/app/server/**/*
server_1  | [23:05:48] [nodemon] starting `node server/bin/www`
```

5. Open a browser window and navigate to: http://localhost:8080

   If everything is working, you'll see a sketch display the Gray Area logo on a dark gray background.

## Project structure

The Node.js app looks for static files to serve in the **public** folder. You can add/delete/edit files in the public folder for your P5.js sketch. Note that a developer tool called BrowserSync will be watching for changes in the public folder, and will automatically trigger a browser refresh when a file has changed (note: CSS changes are hot-loaded into the browser without a refresh).


