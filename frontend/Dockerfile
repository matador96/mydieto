FROM node:14.17.3-alpine3.14 as build-stage
ARG BUILD_CMD=build
RUN apk add git
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .

ARG BUILD_SPEC=INTERNATIONAL
ENV NODE_ENV=production
RUN npm run ${BUILD_CMD}

# этап production (production-stage)
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/build /usr/share/nginx/html
# kostil begin
RUN sed "s+index  index.html index.htm+try_files \$uri \$uri/ /index.html+g" /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/bla.conf
RUN ls -n /etc/nginx/conf.d/bla.conf /etc/nginx/conf.d/default.conf
# kostil end
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

