FROM alpine

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

RUN apk add nodejs npm yarn; \
    npm install -g unlighthouse

EXPOSE 8080

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN chown root:root /usr/lib/chromium/chrome-sandbox && \
    chmod 4755 /usr/lib/chromium/chrome-sandbox

# Add user so we don't need --no-sandbox.
RUN addgroup -S unlighthouse && adduser -S -G unlighthouse unlighthouse

# Run everything after as non-privileged user.
USER unlighthouse
WORKDIR /home/unlighthouse

ADD unlighthouse.config.ts unlighthouse.config.ts 

ENTRYPOINT npx unlighthouse --site ${SITE}