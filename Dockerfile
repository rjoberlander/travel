FROM nginx:alpine

# Copy static files to nginx html directory
COPY site/ /usr/share/nginx/html/

# Copy just the index.html to root for healthcheck
COPY site/index.html /usr/share/nginx/html/index.html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]