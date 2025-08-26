FROM nginx:alpine

# Install curl for healthcheck
RUN apk add --no-cache curl

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static files to nginx html directory
COPY site/ /usr/share/nginx/html/

# Ensure proper permissions
RUN chmod -R 755 /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/health || exit 1

# Expose port from PORT env variable or default to 80
ENV PORT=80
EXPOSE 80

# Start nginx
CMD ["sh", "-c", "nginx -g 'daemon off;'"]