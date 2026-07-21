# ---- Build stage: compile the static site with Astro ----
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies against the lockfile for reproducible builds.
COPY package.json package-lock.json ./
RUN npm ci

# Build the production output into /app/dist.
COPY . .
RUN npm run build

# ---- Runtime stage: serve the static files with nginx on port 5173 ----
FROM nginx:alpine AS runtime

# Custom server block: listens on 5173, serves Astro's directory-style output.
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy only the built site from the build stage (no node_modules in the image).
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]
