FROM node:12.11.1-stretch-slim
RUN yarn global add nodemon
WORKDIR /code/
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build --production
CMD serve -s build
EXPOSE 5000
