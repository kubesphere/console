variable "access_key" {
  default = "QING_ACCESS_KEY"
}

variable "secret_key" {
  default = "QING_SECRET_KEY"
}

variable "eip_id" {
  default = "QING_EIP_ID"
}

variable "eip" {
  default = "QING_EIP"
}

variable "password" {
  default = "QING_PASSWORD"
}

variable "zone" {
  default = "ap2a"
}

terraform {
  required_providers {
    qingcloud = {
      source = "shaowenchen/qingcloud"
      version = "1.2.6"
    }
  }
}

terraform {
  backend "s3" {
    bucket   = "terraform-deploy"
    key      = "GITHUB_REPOSITORY"
    region     = "sh1a"
    endpoint = "s3.sh1a.qingstor.com"
    skip_region_validation      = true
    skip_metadata_api_check     = true
    skip_credentials_validation = true
    access_key = "QING_ACCESS_KEY"
    secret_key = "QING_SECRET_KEY"
  }
}

provider "qingcloud" {
  access_key = "${var.access_key}"
  secret_key = "${var.secret_key}"
  zone = "${var.zone}"
}