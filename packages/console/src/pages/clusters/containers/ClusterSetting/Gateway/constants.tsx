/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Aliyun, Aws, GooglePlus, Kubernetes, Qingcloud, Windows } from '@kubed/icons';
import { GatewayFormValues } from '@ks-console/shared';

export const CLUSTER_PROVIDERS = [
  {
    label: 'Alibaba Cloud ACK',
    value: 'Aliyun ACK',
    icon: <Aliyun />,
  },
  {
    label: 'Azure Kubernetes Service',
    value: 'Aure Kubernetes Service',
    icon: <Windows />,
  },
  {
    label: 'Huawei Cloud CCE',
    value: 'Huawei Cloud CCE',
    icon: <Kubernetes />,
  },
  {
    label: 'Amazon EKS',
    value: 'Amazon EKS',
    icon: <Aws />,
  },
  {
    label: 'Google Kubernetes Engine',
    value: 'Google Kubernetes Engine',
    icon: <GooglePlus />,
  },
  {
    label: 'QingCloud Kubernetes Engine',
    value: 'QingCloud Kubernetes Engine',
    icon: <Qingcloud />,
  },
  {
    label: 'Tencent Kubernetes Engine',
    value: 'Tencent Kubernetes Engine',
    icon: <Kubernetes />,
  },
];

export const TencentKubernetesEngine = {
  'service.kubernetes.io/loadbalance-id': '',
  'service.kubernetes.io/qcloud-loadbalancer-internal-subnetid': '',
  'service.kubernetes.io/tke-existed-lbid': '',
  'service.kubernetes.io/local-svc-only-bind-node-with-pod': '',
  'service.cloud.tencent.com/local-svc-weighted-balance': '',
  'service.kubernetes.io/qcloud-loadbalancer-backends-label': '',
  'service.cloud.tencent.com/direct-access': '',
  'service.cloud.tencent.com/tke-service-config': '',
  'service.cloud.tencent.com/tke-service-config-auto': '',
  'service.kubernetes.io/loadbalance-nat-ipv6': '',
  'service.kubernetes.io/loadbalance-type': '',
  'service.cloud.tencent.com/specify-protocol': '',
  'service.kubernetes.io/service.extensiveParameters': '',
  'service.cloud.tencent.com/enable-grace-shutdown': '',
  'kubernetes.io/service.internetChargeType': '',
  'kubernetes.io/service.internetMaxBandwidthOut': '',
};

export const QingCloud = {
  'service.beta.kubernetes.io/qingcloud-load-balancer-eip-ids': '',
  'service.beta.kubernetes.io/qingcloud-load-balancer-type': '0',
};

export const Huawei = {
  'kubernetes.io/elb.class': '',
  'kubernetes.io/session-affinity-mode': '',
  'kubernetes.io/elb.id': '',
  'kubernetes.io/elb.subnet-id': '',
};

export const GoogleKubernetesEngine = {
  'cloud.google.com/network-tier': '',
};

export const microsoft = {
  'service.beta.kubernetes.io/azure-load-balancer-internal': '',
  'service.beta.kubernetes.io/azure-load-balancer-internal-subnet': '',
  'service.beta.kubernetes.io/azure-dns-label-name': '',
  'service.beta.kubernetes.io/azure-shared-securityrule': '',
  'service.beta.kubernetes.io/azure-load-balancer-resource-group': '',
  'service.beta.kubernetes.io/azure-allowed-service-tags': '',
  'service.beta.kubernetes.io/azure-load-balancer-tcp-idle-timeout': '',
  'service.beta.kubernetes.io/azure-load-balancer-disable-tcp-reset': '',
};

export const aliyun = {
  'service.beta.kubernetes.io/alibaba-cloud-loadbalancer-address-type': '',
  'service.beta.kubernetes.io/alibaba-cloud-loadbalancer-charge-type': '',
  'service.beta.kubernetes.io/alibaba-cloud-loadbalancer-id': '',
  'service.beta.kubernetes.io/alibaba-cloud-loadbalancer-spec	': '',
  'service.beta.kubernetes.io/alibaba-cloud-loadbalancer-master-zoneid	': '',
  'service.beta.kubernetes.io/alibaba-cloud-loadbalancer-slave-zoneid	': '',
  'service.beta.kubernetes.io/alibaba-cloud-loadbalancer-force-override-listeners	': '',
  'service.beta.kubernetes.io/alibaba-cloud-loadbalancer-bandwidth	': '',
  'service.beta.kubernetes.io/alibaba-cloud-loadbalancer-vswitch-id	': '',
  'service.beta.kubernetes.io/alibaba-cloud-loadbalancer-additional-resource-tags	': '',
  'service.beta.kubernetes.io/alibaba-cloud-loadbalancer-ip-version	': '',
  'service.beta.kubernetes.io/alibaba-cloud-loadbalancer-delete-protection	': '',
  'service.beta.kubernetes.io/alibaba-cloud-loadbalancer-modification-protection	': '',
  'service.beta.kubernetes.io/alibaba-cloud-loadbalancer-resource-group-id	': '',
  'service.beta.kubernetes.io/alibaba-cloud-loadbalancer-name	': '',
};

export const EKS = {
  'service.beta.kubernetes.io/load-balancer-source-ranges': '',
  'service.beta.kubernetes.io/aws-load-balancer-type	': '',
  'service.beta.kubernetes.io/aws-load-balancer-nlb-target-type': '',
  'service.beta.kubernetes.io/aws-load-balancer-name	': '',
  'service.beta.kubernetes.io/aws-load-balancer-internal': '',
  'service.beta.kubernetes.io/aws-load-balancer-scheme': '',
  'service.beta.kubernetes.io/aws-load-balancer-proxy-protocol': '',
  'service.beta.kubernetes.io/aws-load-balancer-ip-address-type': '',
  'service.beta.kubernetes.io/aws-load-balancer-access-log-enabled': '',
  'service.beta.kubernetes.io/aws-load-balancer-access-log-s3-bucket-name': '',
  'service.beta.kubernetes.io/aws-load-balancer-access-log-s3-bucket-prefix': '',
  'service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled': '',
  'service.beta.kubernetes.io/aws-load-balancer-ssl-cert': '',
  'service.beta.kubernetes.io/aws-load-balancer-ssl-ports': '',
  'service.beta.kubernetes.io/aws-load-balancer-ssl-negotiation-policy': '',
  'service.beta.kubernetes.io/aws-load-balancer-backend-protocol': '',
  'service.beta.kubernetes.io/aws-load-balancer-additional-resource-tags': '',
  'service.beta.kubernetes.io/aws-load-balancer-healthcheck-healthy-threshold': '',
  'service.beta.kubernetes.io/aws-load-balancer-healthcheck-unhealthy-threshold': '',
  'service.beta.kubernetes.io/aws-load-balancer-healthcheck-timeout': '',
  'service.beta.kubernetes.io/aws-load-balancer-healthcheck-interval': '',
  'service.beta.kubernetes.io/aws-load-balancer-healthcheck-protocol': '',
  'service.beta.kubernetes.io/aws-load-balancer-healthcheck-port	': '',
  'service.beta.kubernetes.io/aws-load-balancer-healthcheck-path': '',
  'service.beta.kubernetes.io/aws-load-balancer-eip-allocations': '',
  'service.beta.kubernetes.io/aws-load-balancer-private-ipv4-addresses	': '',
  'service.beta.kubernetes.io/aws-load-balancer-target-group-attributes': '',
  'service.beta.kubernetes.io/aws-load-balancer-subnets': '',
  'service.beta.kubernetes.io/aws-load-balancer-alpn-policy': '',
  'service.beta.kubernetes.io/aws-load-balancer-target-node-labels': '',
};

export const OpenELB = {
  'lb.kubesphere.io/v1alpha1': '',
  'protocol.openelb.kubesphere.io/v1alpha1': '',
  'eip.openelb.kubesphere.io/v1alpha2': '',
};

export const CLUSTER_PROVIDERS_ANNOTATIONS: Record<string, Record<string, string>> = {
  'Aliyun ACK': aliyun,
  'Aure Kubernetes Service': microsoft,
  'Huawei Cloud CCE': Huawei,
  'Amazon EKS': EKS,
  'Google Kubernetes Engine': GoogleKubernetesEngine,
  'QingCloud Kubernetes Engine': QingCloud,
  'Tencent Kubernetes Engine': TencentKubernetesEngine,
  OpenELB,
};

export const GATEWAY_TEMPLATE: GatewayFormValues = {
  apiVersion: 'gateway.kubesphere.io/v1alpha1',
  kind: 'Gateway',
  metadata: {
    annotations: {
      'kubesphere.io/annotations': '',
    },
  },
  spec: {
    controller: {
      replicas: 1,
      annotations: {},
      config: {},
      scope: { enabled: false, namespace: '' },
    },
    deployment: {
      annotations: {},
      replicas: 1,
    },
    service: {
      annotations: {},
      type: 'NodePort',
    },
  },
};
