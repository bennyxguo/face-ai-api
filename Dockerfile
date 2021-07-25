FROM node:16
WORKDIR /usr/src/face-ai-api
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
CMD [ "/bin/bash" ]
