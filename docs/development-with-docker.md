# Development with Docker

KubeSphere Console can be developed in a docker enviroment with following steps.

Required:

- [Docker](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Install dependencies

```bash
make install
make yarn-lego
```

## Start KubeSphere Console for development

```bash
make dev
```

Now, you can access http://localhost:8000 in the browser.

## Run tests

```bash
make yarn-test
```

### Build KubeSphere Console for production

The project can be built for production by using the following task:

```sh
make build
```

To build KubeSphere console to an image, run the following task after `yarn build`:

```sh
docker build -t ks-console .
```

## Run npm scripts in docker

```bash
# eg. run 'yarn test' in docker: make yarn-test
make yarn-*
```
