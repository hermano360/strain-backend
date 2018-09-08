FROM node:8

# create app directory

WORKDIR /usr/src/app

# Install app dependencies
# a wildcard is used to ensure both package.json and package-lock.json are copied
# where available (npm@5+)

COPY package*.json ./

RUN npm install

# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8000
CMD [ "npm", "start"]
