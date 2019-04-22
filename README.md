# Film Seeker

### This project is divided into two applications: Film Seeker Frontend and Film Seeker Backend.

### The Film Seeker Frontend, built on Reactjs with a Redux store, makes http requests to Film Seeker Backend in order retrieve data and present it in the shape of graphs. **Note**: More information can be found in the Readme under the `frontend` folder.

### The Film Seeker Backend, built on Nodejs, consumes the [OMDb API](http://www.omdbapi.com) REST API and handles the requests from Film Seeker Frontend to the OMDb API. **Note**: More information can be found in the Readme under the `backend` folder.

### Instructions

1. Install NodeJS >= v8-9;
2. Run `sh install-dependencies.sh` to install Frontend's and Backend's dependencies;
3. Run `sh start-frontend.sh` to start the Frontend;
4. Run `sh start-backend.sh` to start the Backend.