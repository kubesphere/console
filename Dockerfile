FROM node:12-alpine
RUN adduser -D -g kubesphere -u 1002 kubesphere && \
    mkdir -p /opt/kubesphere/console && \
    chown -R kubesphere:kubesphere /opt/kubesphere/console
WORKDIR /opt/kubesphere/console
COPY . /opt/kubesphere/console
RUN mv dist/server.js server/server.js
USER kubesphere
EXPOSE 8000
CMD ["npm", "run", "serve"]