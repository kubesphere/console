# Development with Docker

KubeSphere Console can be developed in a docker enviroment by following the steps as below.

Required:

- [Docker](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Set up

create a volume to store node_modules.

```bash
make setup
```

## Install dependencies

install node_modules, and compile lego-ui components.

```bash
make install
```

## Start KubeSphere Console for development

Before start development, please follow [the guide](/docs/access-backend.md) to configure the backend services of KubeSphere.

```bash
make dev
```

Now you can access http://localhost:8000 to view the console using the default account admin / P@88w0rd.

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
