# pull official base image
FROM node:18-alpine3.17 AS builder

# set working directory
WORKDIR /app

COPY package.json ./

# Installs all node packages
RUN npm install 


# Copies everything over to Docker environment
COPY . ./
RUN npm run build

#Stage 2
#######################################
FROM nginx:1.23.3
#copies React to the container directory
# Set working directory to nginx resources directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static resources
RUN rm -rf ./*
# Copies static resources from builder stage
COPY --from=builder /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]