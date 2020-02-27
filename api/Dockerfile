FROM node:6.11.5    

COPY package.json .
RUN npm install    
COPY . .

CMD [ "npm", "start" ]
