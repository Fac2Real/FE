# Dockerfile for factoreal-FE

FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

ENV NODE_ENV=development
ENV HOST=0.0.0.0

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host" ]