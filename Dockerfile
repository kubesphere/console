FROM node:10-alpine AS builder

RUN apk add g++ gcc make python    

WORKDIR /home/node
COPY . .

# Install dependencies and Build
RUN yarn && yarn build


FROM node:10-alpine

RUN mkdir -p /root/KubeSphereUI

COPY --from=builder /home/node/dist /root/KubeSphereUI/dist
COPY --from=builder /home/node/server /root/KubeSphereUI/server
COPY --from=builder /home/node/package.json /home/node/yarn.lock /root/KubeSphereUI/

WORKDIR /root/KubeSphereUI
RUN mv dist/server.js server/server.js \
    && mv dist/fonts fonts
EXPOSE 8000
CMD ["npm", "run", "serve"]
