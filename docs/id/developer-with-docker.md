# Development with Docker

Konsol KubeSphere dapat dikembangkan di lingkungan buruh pelabuhan dengan mengikuti langkah-langkah seperti di bawah ini.

Required:

- [Docker](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## mempersiapkan

buat volume untuk menyimpan node_modules.

```bash
make setup
```

## Install dependencies

instal node_modules, dan kompilasi komponen lego-ui.

```bash
make install
```

Sebelum memulai pengembangan, ikuti [panduan](/docs/access-backend.md) untuk mengonfigurasi layanan backend KubeSphere.

```bash
make dev
```

Sekarang Anda dapat mengakses http://localhost:8000 untuk melihat konsol menggunakan admin akun default / P@88w0rd.

### Jalankan

```bash
make yarn-test
```

### Bangun Konsol KubeSphere untuk produksi

Proyek dapat dibangun untuk produksi dengan menggunakan tugas berikut:

```sh
make build
```

Untuk membangun konsol KubeSphere ke sebuah gambar, jalankan tugas berikut setelah `yarn build`:

```sh
docker build -t ks-console .
```

## Jalankan Docker

```bash
# eg. run 'yarn test' in docker: make yarn-test
make yarn-*
```
