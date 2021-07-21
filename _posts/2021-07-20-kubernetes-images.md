---
layout: post
title: K8S 镜像版本及获取
subtitle: "kubernetes images version mapping and pulling"
author: "kaelzhan"
header-img: "img/home/bg-arrows.jpg"
date: 2021-07-20
categories: Devops
tags: [Devops,Kubernetes,docker,image]
description: 在国内从阿里云获取 kubernetes 版本对应的镜像
catalog: true
---

## K8S images pull script from aliyun
```bash
#!/bin/bash

set -e
# Check version in https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-init/
# Search "Running kubeadm without an internet connection"
# For running kubeadm without an internet connection you have to pre-pull the required master images for the version of choice:

KUBE_VERSION=v1.21.3
KUBE_PAUSE_VERSION=3.4.1
ETCD_VERSION=3.4.13-0
COREDNS_VERSION=v1.8.0
# KUBE_DASHBOARD_VERSION=v2.0.0-beta5
GCR_URL=k8s.gcr.io
ALIYUN_URL=registry.cn-hangzhou.aliyuncs.com/google_containers

images=(
kube-proxy:${KUBE_VERSION}
kube-scheduler:${KUBE_VERSION}
kube-controller-manager:${KUBE_VERSION}
kube-apiserver:${KUBE_VERSION}
pause:${KUBE_PAUSE_VERSION}
etcd:${ETCD_VERSION}
coredns/coredns:${COREDNS_VERSION}
# kubernetes-dashboard:${KUBE_DASHBOARD_VERSION}
)

for imageName in ${images[@]} ; do
docker pull $ALIYUN_URL/$imageName
docker tag $ALIYUN_URL/$imageName $GCR_URL/$imageName
docker rmi $ALIYUN_URL/$imageName
done

docker images
```

## K8S images Version List
#### K8S v1.21.3
```bash
> kubeadm config images list
k8s.gcr.io/kube-apiserver:v1.21.3
k8s.gcr.io/kube-controller-manager:v1.21.3
k8s.gcr.io/kube-scheduler:v1.21.3
k8s.gcr.io/kube-proxy:v1.21.3
k8s.gcr.io/pause:3.4.1
k8s.gcr.io/etcd:3.4.13-0
k8s.gcr.io/coredns/coredns:v1.8.0
```

#### K8S v1.21.0
```bash
> kubeadm config images list
k8s.gcr.io/kube-apiserver:v1.21.0
k8s.gcr.io/kube-controller-manager:v1.21.0
k8s.gcr.io/kube-scheduler:v1.21.0
k8s.gcr.io/kube-proxy:v1.21.0
k8s.gcr.io/pause:3.4.1
k8s.gcr.io/etcd:3.4.13-0
k8s.gcr.io/coredns/coredns:v1.8.0
```

#### K8S v1.20.4
```bash
> kubeadm config images list
k8s.gcr.io/kube-apiserver:v1.20.4
k8s.gcr.io/kube-controller-manager:v1.20.4
k8s.gcr.io/kube-scheduler:v1.20.4
k8s.gcr.io/kube-proxy:v1.20.4
k8s.gcr.io/pause:3.2
k8s.gcr.io/etcd:3.4.13-0
k8s.gcr.io/coredns:1.7.0
```

#### K8S v1.19.1
```bash
> kubeadm config images list
k8s.gcr.io/kube-apiserver:v1.19.1
k8s.gcr.io/kube-controller-manager:v1.19.1
k8s.gcr.io/kube-scheduler:v1.19.1
k8s.gcr.io/kube-proxy:v1.19.1
k8s.gcr.io/pause:3.2
k8s.gcr.io/etcd:3.4.13-0
k8s.gcr.io/coredns:1.7.0
```

#### K8S v1.18.1
```bash
> kubeadm config images list
k8s.gcr.io/kube-apiserver:v1.18.1
k8s.gcr.io/kube-controller-manager:v1.18.1
k8s.gcr.io/kube-scheduler:v1.18.1
k8s.gcr.io/kube-proxy:v1.18.1
k8s.gcr.io/pause:3.2
k8s.gcr.io/etcd:3.4.3-0
k8s.gcr.io/coredns:1.6.7
```

#### K8S v1.14.0
```bash
> kubeadm config images list
k8s.gcr.io/kube-apiserver:v1.14.0
k8s.gcr.io/kube-controller-manager:v1.14.0
k8s.gcr.io/kube-scheduler:v1.14.0
k8s.gcr.io/kube-proxy:v1.14.0
k8s.gcr.io/pause:3.1
k8s.gcr.io/etcd:3.3.10
k8s.gcr.io/coredns:1.3.1
```
