# Access the backend services of KubeSphere

## 1. Access the services of the KubeSphere cluster from outside

### Expose the KubeSphere api server service to the host

```sh
kubectl -n kubesphere-system patch svc ks-apiserver -p '{"spec":{"type":"NodePort","ports":[{"name":"ks-apiserver","port":80,"protocal":"TCP","targetPort":9090,"nodePort":30881}]}}'
```

The above command exposes the ks-apiserver service through the node port 30881. You can access the ks-apiserver service through any <node_ip>:<30881> port in the cluster.

### Config api server in KubeSphere Console

Add the file `local_config.yaml` under the folder `server`

local_config.yaml

```yaml
server:
  apiServer:
    url: http://node_ip:30881
    wsUrl: ws://node_ip:30881
```

See more details in [KubeSphere API Guide](https://v2-1.docs.kubesphere.io/docs/api-reference/api-guide/).

## 2. Access the services within the KubeSphere cluster

If you are in the same network as the cluster. You can access the ks-apiserver using K8s DNS with the default configuration in `server/config.yaml`

```yaml
server:
  apiServer:
    url: http://ks-apiserver.kubesphere-system.svc
    wsUrl: ws://ks-apiserver.kubesphere-system.svc
```
