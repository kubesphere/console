resource "qingcloud_security_group" "basic"{
  name = "cd-console"
  description = "cd-console"
}

resource "qingcloud_security_group_rule" "openport" {
  security_group_id = "${qingcloud_security_group.basic.id}"
  protocol = "tcp"
  priority = 0
  action = "accept"
  direction = 0
  from_port = 22
  to_port = 40000
}

resource "qingcloud_instance" "init"{
  count = 1
  name = "cd-console"
  image_id = "centos76x64a"
  cpu = "8"
  memory = "16384"
  instance_class = "0"
  managed_vxnet_id="vxnet-0"
  login_passwd = "${var.password}"
  security_group_id ="${qingcloud_security_group.basic.id}"
  eip_id = "${var.eip_id}"
  os_disk_size = "100"
}

resource "null_resource" "install_kubesphere" {
  provisioner "file" {
    destination = "./install.sh"
    source      = "./install.sh"

    connection {
      type        = "ssh"
      user        = "root"
      host        = "${var.eip}"
      password    = "${var.password}"
      port        = "22"
    }
  }

  provisioner "remote-exec" {
    inline = [
      "sh install.sh"
    ]

    connection {
      type        = "ssh"
      user        = "root"
      host        = "${var.eip}"
      password    = "${var.password}"
      port        = "22"
    }
  }
}