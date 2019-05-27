---
layout: post
title: Helm 安装
date: 2019-05-19
categories: blog
tags: [Devops,K8S,Helm]
description: K8S 的高效管理方式：Helm。
---

# 目录

* [1 Helm Client 安装](#1-helm-client-安装)
    * [1.1 Ubuntu安装helm](#11-ubuntu安装helm)
    * [1.2 其他Linux安装helm](#12-其他linux安装helm)
    * [1.3 MAC安装helm](#13-mac安装helm)
* [2 Helm Tiller 安装](#2-helm-tiller-安装)
* [3 Helm Tiller 自定义配置](#3-helm-tiller-自定义配置)
    * [3.1 修改tiller的deployment，指定节点和镜像](#31-修改tiller的deployment指定节点和镜像)
    * [3.2 修改tiller的svc，指定NodePort端口](#32-修改tiller的svc指定nodeport端口)
    * [3.3 通过指定Tiller启动参数修改配置](#33-通过指定tiller启动参数修改配置)
* [4 Helm Tiller 删除](#4-helm-tiller-删除)
* [5 Helm 常用命令](#5-helm-常用命令)
    * [5.1 Helm upgrade](#51-helm-upgrade)
    * [5.2 搜索，获取及解压Helm应用](#52-搜索获取及解压helm应用)
    * [5.3 调试生成Helm应用的详细信息，但不执行](#53-调试生成helm应用的详细信息但不执行)
    * [5.4 安装Helm应用](#54-安装helm应用)
    * [5.5 更改Helm安装的K8S resourse名称](#55-更改helm安装的k8s-resourse名称)
    * [5.6 卸载Helm应用](#56-卸载helm应用)
    * [5.7 升级及回退Helm应用](#57-升级及回退helm应用)
    * [5.8 查看Helm应用信息](#58-查看helm应用信息)
    * [5.9 其他命令](#59-其他命令)


# 1 Helm Client 安装
helm client主要作用如下：
+ 用来部署 Tiller server
+ 用来管理 Chart repository
+ 用来管理 Chart package

### 1.1 Ubuntu安装helm

```
sudo snap install helm --classic
```
&nbsp;

### 1.2 其他Linux安装helm 

```
wget https://storage.googleapis.com/kubernetes-helm/helm-v2.9.1-linux-amd64.tar.gz
tar -zxvf helm-v2.9.1-linux-amd64.tar.gz
cd linux-amd64
mv helm /usr/local/bin/
```
&nbsp;

### 1.3 MAC安装helm 

```
brew install kubernetes-helm
```
&nbsp;


# 2 Helm Tiller 安装
Helm Tiller是Helm的server，用来管理release。  

Tiller有多种安装方式，比如本地安装或以pod形式部署到Kubernetes集群中。  
本文以pod安装为例，安装Tiller的最简单方式是 `helm init` 。该命令会检查helm本地环境设置是否正确，`helm init` 会连接kubectl当前默认连接的kubernetes集群（可以通过 `kubectl config view` 查看），一旦连接集群成功，tiller会被安装到 `kube-system` namespace中。

`helm init` 命令通过 Kubernetes 的 Deployment 部署 tiller，并且在本机配置一个名为 `local` 的本地repo，当前用户目录下会生成 `.helm` 文件夹（即 `~/.helm` ）放置repo相关内容。

`helm init` 主要做以下三件事情：
+ 部署Tiller
+ 初始化本地 cache
+ 初始化本地 chart仓库

`Tiller` pod 安装代码  

```
kubectl create serviceaccount --namespace kube-system tiller
kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
helm init --service-account tiller
```
&nbsp;


# 3 Helm Tiller 自定义配置

### 3.1 修改tiller的deployment，指定节点和镜像

``` 
kubectl edit deployment tiller-deploy -n kube-system
```

```
  image: daocloud.io/liukuan73/tiller-lk:v2.9.1
  nodeSelector:
    node-role.kubernetes.io/master: "true"
  tolerations:
  - key: node-role.kubernetes.io/master
    effect: NoSchedule
```
&nbsp;

### 3.2 修改tiller的svc，指定NodePort端口

``` 
kubectl edit svc tiller-deploy -n kube-system
```

```
  ports:
  - name: tiller
    nodePort: 32134
  type: NodePort
```
&nbsp;

### 3.3 通过指定Tiller启动参数修改配置

- 安装金丝雀build： `--canary-image`
- 安装指定image： `--tiller-image`
- 指定某一个Kubernetes集群： `--kube-context`
- 指定namespace安装： `--tiller-namespace`

```
helm init --tiller-image=daocloud.io/liukuan73/tiller-lk:v2.9.1 --tiller-namespace=kube-system
```
&nbsp;


# 4 Helm Tiller 删除 
由于 Tiller的数据存储于Kubernetes ConfigMap中，所以删除、升降级Tiller，原Helm部署的应用数据并不会丢失。 
删除Tiller：

```
helm reset
```
&nbsp;


# 5 Helm 常用命令

### 5.1 Helm upgrade

```
helm init --upgrade
```
&nbsp;

### 5.2 搜索，获取及解压Helm应用

```
helm search wordpress
helm fetch stable/wordpress  ##获取tgz包
helm fetch --untar stable/wordpress  ##获取并解压
```
&nbsp;

### 5.3 调试生成Helm应用的详细信息，但不执行

```
helm install --debug --dry-run ./aws-discovery
```
&nbsp;

### 5.4 安装Helm应用

```
helm install --name nginx-ingress stable/nginx-ingress  ##指定名称安装
helm install --name dashboard --namespace kube-system --set rbac.clusterAdminRole=true stable/kubernetes-dashboard  ##指定名称，namespace及其他参数
helm install stable/wordpress --version 5.0.1  ##安装指定版本的应用
```
&nbsp;

### 5.5 更改Helm安装的K8S resourse名称
helm 安装的K8S resourse名称默认为 `realease-name+chart-name` , 需要更改可使用以下命令

```
helm upgrade dashboard stable/kubernetes-dashboard --set fullnameOverride="dashboard"
```
&nbsp;

### 5.6 卸载Helm应用

```
helm delete ***  ##卸载后release name依然被占用，可使用 `helm ls --all` 查看到应用，并可使用 `helm rollback *** $version` 回退
helm delete --purge ***  ##完全卸载，释放release name，且不可回退
```
&nbsp;

### 5.7 升级及回退Helm应用

```
helm upgrade my-release -f mysql/values.yaml ./my-release  ##升级helm应用
helm rollback my-release 1  ##1为版本号，可以添加 --debug打印调试信息
```
&nbsp;

### 5.8 查看Helm应用信息

```
heml ls  ##查询当前K8S集群安装了的Helm应用
helm list  ##同上
helm list -a  ##查看包含删除了的helm应用，完全删除的不能查看

helm get my-release  ##显示安装的helm应用的详细yaml内容
helm status my-release  ##显示安装的helm应用的包含的K8S resource及状态
helm history my-release  ##查看helm应用的版本信息
```
&nbsp;

### 5.9 其他命令

```
helm version  ##查看helm客户端及tiller服务端版本
helm home  ##查看当前helm配置目录

cd ./wordpress
helm dep list  ##查看当前helm chart的依赖包
helm dep update  ##下载当前helm chart的依赖包到 ./charts
helm install .  ##安装当前目录下的helm应用
```
&nbsp;
