# Use multi-stage build to install dependencies and build
FROM alpine AS build

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    npm 

# Create a directory for global installation
RUN mkdir /install && \
    npm install -g --prefix /install unlighthouse

RUN chown root:root /usr/lib/chromium/chrome-sandbox && \
    chmod 4755 /usr/lib/chromium/chrome-sandbox

RUN addgroup -S unlighthouse && adduser -S -G unlighthouse unlighthouse

# Final Stage
FROM alpine

# Copy necessary files from build stage
COPY --from=build /usr/bin/chromium-browser /usr/bin/chromium-browser
COPY --from=build /usr/lib/chromium/ /usr/lib/chromium/
COPY --from=build /usr/share/fonts/ /usr/share/fonts/
COPY --from=build /install /install
COPY --from=build /etc/passwd /etc/passwd
COPY --from=build /etc/group /etc/group

# Install Node.js and npm in the final image
RUN apk add --no-cache nodejs npm
RUN npm install -g unlighthouse

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Run everything after as non-privileged user.
USER unlighthouse
WORKDIR /home/unlighthouse

EXPOSE 8080

ENTRYPOINT npx unlighthouse --config-file ${CONFIG} --site ${SITE}
