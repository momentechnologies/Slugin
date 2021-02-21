FROM node:14

# Create app directory
WORKDIR /var/www/app

# Bundle app source
COPY . .

RUN yarn install

# Run any other build steps such as `npm run build`
ENV APP_COMMIT_REF=${COMMIT_REF} \
    APP_BUILD_DATE=${BUILD_DATE}

EXPOSE 80

CMD [ "bash", "-c", "yarn; yarn start:dev" ]