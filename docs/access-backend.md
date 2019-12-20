# Access the backend services of KubeSphere

## 1. Access the services of the KubeSphere cluster from outside

### Expose the KubeSphere gateway service to the host

```sh
kubectl -n kubesphere-system patch svc ks-apigateway -p '{"spec":{"type":"NodePort","ports":[{"name":"ks-apigateway","port":80,"protocal":"TCP","targetPort":2018,"nodePort":30881}]}}'
```

The above command exposes the ks-apigateway service through the node port 30881. You can access the ks-apigateway service through any <node_ip>:<30881> port in the cluster.

### Config gateway server in KubeSphere Console

Add the file `local_config.yaml` under the folder `server`

local_config.yaml

```yaml
server:
  gatewayServer:
    url: http://node_ip:30881
    wsUrl: ws://node_ip:30881
```

See more details in [KubeSphere API Guide](https://kubesphere.io/docs/v2.1/zh-CN/api-reference/api-guide/).

## 2. Access the services within the KubeSphere cluster

If you are in the same network as the cluster. You can access the ks-apigateway using K8s DNS with the default configuration in `server/config.yaml`

```yaml
server:
  gatewayServer:
    url: http://ks-apigateway.kubesphere-system.svc
    wsUrl: ws://ks-apigateway.kubesphere-system.svc
```
