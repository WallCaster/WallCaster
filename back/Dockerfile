# Base image
FROM node:19-alpine3.16

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 3001

# Remove .gitignore file from assets folder
RUN rm /usr/src/app/assets/.gitignore

CMD [ "node", "build/index.js" ]
