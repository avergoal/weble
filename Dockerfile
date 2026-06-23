FROM node:0.12
RUN npm install
RUN mkdir /myapp
WORKDIR /myapp
ADD package.json /myapp/package.json
RUN npm install
ADD . /myapp
