FROM node:16.14-alpine3.15 as builder

WORKDIR /kubesphere
ADD . /kubesphere/

# If you have trouble downloading the yarn binary, try the following:
# RUN yarn config set registry https://registry.npmmirror.com

RUN yarn && yarn build

# Copy compiled files
RUN mkdir -p /out/server
RUN mv /kubesphere/dist/ /out/
RUN mv /kubesphere/server/locales \
       /kubesphere/server/public \
       /kubesphere/server/views \
       /kubesphere/server/sample \
       /kubesphere/server/configs /out/server/
#RUN ["/bin/bash", "-c", "mv /kubesphere/server/{locales,public,sample,views,config.yaml} /out/server/"]
RUN mv /kubesphere/package.json /out/

# generate version file to out
RUN hack/version.sh > /out/version.txt

##############
# Final Image
##############
FROM node:16.14-alpine3.15 as base_os_context

RUN adduser -D -g kubesphere -u 1002 kubesphere && \
    mkdir -p /opt/kubesphere/console && \
    chown -R kubesphere:kubesphere /opt/kubesphere/console

WORKDIR /opt/kubesphere/console
COPY --from=builder /out/ /opt/kubesphere/console/

RUN mv dist/server.js server/server.js
USER kubesphere

EXPOSE 8080

CMD ["npm", "run", "serve"]
