FROM nginx:alpine

COPY dist /usr/share/nginx/html/dist/{{extensionName}}-frontend
