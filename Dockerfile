FROM node:8-alpine
RUN mkdir -p /root/KubeSphereUI
WORKDIR /root/KubeSphereUI
COPY . /root/KubeSphereUI
RUN mv dist/server.js server/server.js \
    && mv dist/fonts fonts
EXPOSE 8000
CMD ["npm", "run", "serve"]