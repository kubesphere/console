Akses layanan backend KubeSphere

## 1. Akses layanan cluster KubeSphere dari luar

### Mengekspos layanan server api KubeSphere ke host


```sh
kubectl -n kubesphere-system patch svc ks-apiserver -p '{"spec":{"type":"NodePort","ports":[{"port":80,"protocal":"TCP","targetPort":9090,"nodePort":30881}]}}'
```

Perintah di atas memperlihatkan layanan ks-apiserver melalui port node 30881. Anda dapat mengakses layanan ks-apiserver melalui port <node_ip>:<30881> apa pun di cluster.

### Konfigurasi server api di Konsol KubeSphere Tambahkan file 

`local_config.yaml` di bawah folder `server` local_config.yaml

```yaml
server:
  apiServer:
    url: http://node_ip:30881
    wsUrl: ws://node_ip:30881
```

Lihat detail selengkapnya di [Panduan API KubeSphere](https://v2-1.docs.kubesphere.io/docs/api-reference/api-guide/).

## 2. Akses layanan dalam cluster KubeSphere Jika Anda berada di jaringan yang sama dengan cluster.

Anda dapat mengakses ks-apiserver menggunakan K8s DNS dengan konfigurasi default di `server/config.yaml`

```yaml
server:
  apiServer:
    url: http://ks-apiserver.kubesphere-system.svc
    wsUrl: ws://ks-apiserver.kubesphere-system.svc
```
