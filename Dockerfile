# Start with the latest Node.js LTS release
FROM node:6.10.2

# Set an env variable for the location of the app files, update path
# to include any installed node module executables
ENV APP_HOME=/opt/node/app \
    PATH=$PATH:/opt/node/app/node_modules/.bin

# Create a directory for the server app to run from
RUN mkdir -p $APP_HOME

# Add the project files into the app directory and set as working directory
ADD . $APP_HOME
WORKDIR $APP_HOME

RUN yarn install
