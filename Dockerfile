FROM node:18-slim AS builder

# Define build arguments for each environment variable
ARG GOOGLE_CLIENT_ID
ARG CLOVER_API_BASE_URL
ARG STORES_CONFIG

# Set environment variables for the build
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ENV CLOVER_API_BASE_URL=${CLOVER_API_BASE_URL}
ENV STORES_CONFIG=${STORES_CONFIG}

WORKDIR /app
COPY package.json ./

RUN npm install
COPY . .
RUN npx expo export -p web

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]