# KubeSphere Console

[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/kubesphere/console)
![](https://github.com/kubesphere/console/workflows/Main/badge.svg)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

KubeSphere console is the web interface for [KubeSphere](https://github.com/kubesphere/kubesphere).

![KubeSphere Console](docs/images/dashboard-ui.png)

## Getting Started

Console should be always used with KubeSphere, you can either use [Kubekey](https://github.com/kubesphere/kubekey) or [ks-installer](https://github.com/kubesphere/ks-installer) to create a KubeSphere cluster.  
The following will show you how to build console from source code.


### Prerequisite
#### Node.js
Console is written using Javascript. If you don't have a Node.js development environment, please [set it up](https://nodejs.org/en/download/). The minimum version required is 12.18.

#### Yarn
We use [Yarn](https://yarnpkg.com/) to do package management. If you don't have yarn, use the following to install:
```
npm install -g yarn@1.22.4
```
The minimum version required is 1.22.4, but you can use a newer version.

#### [Optional]Docker
This is optional. If you just want to test and build on your local environment, there is no need to install docker. Otherwise, you need to install it.
[Install on Mac](https://docs.docker.com/desktop/mac/install/)
[Install on Windows](https://docs.docker.com/desktop/windows/install/)
[Install on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

#### [Optional]Make
This is optional too, we use `make` to reduce hand work, but it's totally ok without it.

## How to build

Clone the repository, and run `yarn && yarn build`
```sh
git clone https://github.com/kubesphere/console.git
cd console/
yarn && yarn build
npm run serve
```
> If you have trouble downloading the dependencies, try the following
>
> `yarn config set registry https://registry.npmmirror.com`


After `npm run serve`, you should see the output like the following

```
> kubesphere-console@master serve
> NODE_ENV=production node server/server.js

Dashboard app running at port 8000
```
Now, console is up and running. But since there is no backed KubeSphere cluster, you shouldn't be able to login.

## How to debug
A KubeSphere cluster is required to start debugging. You can refer to [Installation](https://github.com/kubesphere/kubesphere#installation) to create a KubeSphere cluster.

Once the cluster is up, you replace the address of `ks-apiserver` in `server/config.yaml` with your real address. You can refer to [access KubeSphere apiserver](docs/access-backend.md) to expose your cluster `ks-apiserver`.
```
  # backend service gateway server
  apiServer:
    clientID: kubesphere
    clientSecret: kubesphere
    url: http://ks-apiserver
    wsUrl: ws://ks-apiserver
```

## How to build container image

Just run the following command with your real `REPO` address.
```
REPO=yourawesomerepo make container
```

## How to submit a PR

Follow [Development Workflow](/docs/development-workflow.md) to commit your codes.

## Features Map:
![Features Map](docs/images/module-map.jpg)

## Support, Discussion, and Community

If you need any help with KubeSphere, please join us at [Slack Channel](https://join.slack.com/t/kubesphere/shared_invite/zt-1ilxbsp39-t4ES4xn5OI0eF5hvOoAhEw).

Please submit any KubeSphere Console bugs, issues, and feature requests to [KubeSphere Console GitHub Issue](https://github.com/kubesphere/console/issues).

## Contributing to the project

Welcome to contribute to KubeSphere Console, see [Contributing Guide](CONTRIBUTING.md).

The KubeSphere localization project has been launched on Crowdin. You can help localize the KubeSphere web console by referring to the [localization guide](docs/join-the-kubesphere-localization-project.md).
