# KubeSphere Console

![](https://github.com/leoendless/console/workflows/Main/badge.svg)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

KubeSphere Console is a general purpose, web-based UI for [KubeSphere](https://github.com/kubesphere/kubesphere) clusters.

![KubeSphere Console](docs/images/dashboard-ui.png)

## Getting Started

A KubeSphere cluster is required before getting started.

Read [Installation](https://github.com/kubesphere/kubesphere#installation) guide to install a cluster.

Read [To start using KubeSphere](https://github.com/kubesphere/kubesphere#to-start-using-kubesphere) to get start using.

Features Map:

![Features Map](docs/images/module-map.jpg)

## Developer Guide

### Preparation

Make sure the following software is installed and added to the \$PATH variable:

- A KubeSphere cluster ([Installation](https://github.com/kubesphere/kubesphere#installation))
- Node.js 8+ ([installation with nvm](https://github.com/creationix/nvm#usage))
- Yarn 1.19.1+

Install yarn with npm:

```sh
npm install -g yarn
```

Clone the repository and install the dependencies:

```sh
yarn
```

### Expose the KubeSphere gateway service to the host

```sh
kubectl -n kubesphere-system patch svc ks-apigateway --patch '{"spec": {"type": "NodePort"}}'
```

Get the service port

```sh
kubectl -n kubesphere-system get svc | grep ks-apigateway
```

### Config gateway server in KubeSphere Console

Add `local_config.yaml` into `server`

local_config.yaml

```yaml
server:
  gatewayServer:
    url: http://gateway_server_ip:port
    wsUrl: ws://gateway_server_ip:port
```

`gateway_server_ip` is the host ip, `port` is the gateway service port

### Start KubeSphere Console for development

```sh
yarn lego
yarn start
```

### Run tests

```sh
yarn test
```

### Build KubeSphere Console for production

The project can be built for production by using the following task:

```sh
yarn build
```

To build and serve from dist, using the following task:

```sh
yarn serve
```

To build KubeSphere console to an image, run the following task after `yarn build`:

```sh
docker build -t ks-console .
```

Test KubeSphere console image by run:

```sh
./docker-run
```

## Development Workflow

Follow [Development Workflow](/docs/development-workflow.md) to commit your codes.

## Support, Discussion, and Community

If you need any help with KubeSphere, please join us at [Slack Channel](https://join.slack.com/t/kubesphere/shared_invite/enQtNTE3MDIxNzUxNzQ0LTZkNTdkYWNiYTVkMTM5ZThhODY1MjAyZmVlYWEwZmQ3ODQ1NmM1MGVkNWEzZTRhNzk0MzM5MmY4NDc3ZWVhMjE).

Please submit any KubeSphere Console bugs, issues, and feature requests to [KubeSphere Console GitHub Issue](https://github.com/kubesphere/console/issues).

## Contributing to the project

How to contributing to KubeSphere Console ? See [Contributing Guide](docs/contributing-guide.md).
