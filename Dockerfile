FROM node:16
ENV HTTP_PROXY "http://host.docker.internal:7890"
ENV HTTPS_PROXY "http://host.docker.internal:7890"
WORKDIR /usr/src/face-ai-api
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
CMD [ "/bin/bash" ]
