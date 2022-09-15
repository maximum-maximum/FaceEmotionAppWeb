FROM node:14-alpine AS development

ENV NODE_ENV development

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3333

CMD ["npm", "start"]