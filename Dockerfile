FROM mhart/alpine-node:10.7.0
RUN npm i -g serve > /dev/null
WORKDIR /code/
COPY package*.json ./
RUN npm i > /dev/null
COPY . .
ENV REACT_APP_API_URL https://gather-api-hku.herokuapp.com/
RUN npm run build --production
CMD serve -s build
EXPOSE 5000
