---
layout: post
title: 本地Helm Charts repo服务器搭建
subtitle: "To setup a local Helm Charts repo server."
author: "kaelzhan"
header-img: "img/post-bg-helm.jpg"
header-mask: 0.3
mathjax: true
date: 2019-05-20
categories: Devops
tags: [Devops,Kubernetes,Helm]
description: Kubernetes 的高效管理方式：Helm。
catalog: true
---

# 目录

* [1. Helm charts repo](#1-helm-charts-repo)
* [2. 本地 `.helm` 目录结构](#2-本地-helm-目录结构)
* [3. 搭建本地helm chart repo服务器](#3-搭建本地helm-chart-repo服务器)
    * [3.1 创建本地repo目录](#31-创建本地repo目录)
    * [3.2 在本地启动helm charts repo仓库服务](#32-在本地启动helm-charts-repo仓库服务)
    * [3.3 通过 `helm repo add` 命令添加本地repo](#33-通过-helm-repo-add-命令添加本地repo)
    * [3.4 查看本地charts仓库是否添加成功](#34-查看本地charts仓库是否添加成功)
* [4. 向repo中增加软件包](#4-向repo中增加软件包)
    * [4.1 将chart文件夹移动到repo目录，并打包](#41-将chart文件夹移动到repo目录并打包)
    * [4.2 更新 `index.yaml` 文件](#42-更新-indexyaml-文件)
    * [4.3 验证](#43-验证)
* [5. 从本地仓库安装chart软件包（即release过程）](#5-从本地仓库安装chart软件包即release过程)


# 1. Helm charts repo
Helm charts repo是一个可用来存储Helm packages的HTTP server。

一个helm charts repo仓库由一个index.yaml文件与多个包含helm charts的tar包组成，index.yaml记录了仓库中全部charts的tar包的索引。

当要分享chart时，需要上传chart文件到charts仓库。任何一个能够提供YAML与tar文件的HTTP server都可以当做charts仓库，比如Google Cloud Storage (GCS) bucket、Amazon S3 bucket、Github Pages或创建你自己的web服务器。官方chart仓库由Kubernetes Charts维护，Helm允许我们创建私有chart仓库。

查看目前的helm charts repo：

```
$ helm repo list
NAME        URL
stable      https://kubernetes-charts.storage.googleapis.com
local       http://127.0.0.1:8879/charts
```


## 2. 本地 `.helm` 目录结构

helm执行 `helm init` 命令后会在当前用户Home目录下生成一个名为 `.helm` 的文件夹，其中包含一个名为 `local` 的本地helm charts repo。

`.helm` 文件夹目录机构如下：

```
~/.helm/
|-- cache
| `-- archive
|-- plugins
|-- repository
| |-- cache
| | |-- local-index.yaml -> /home/username/.helm/repository/local/index.yaml
| | `-- stable-index.yaml
| |-- local
| | `-- index.yaml
| `-- repositories.yaml
`-- starters
```

`~/.helm/repository/local/index.yaml` 文件中记录了charts的诸如名称、url、version等一些metadata信息。


## 3. 搭建本地helm chart repo服务器

### 3.1 创建本地repo目录

```
mkdir -p /dcos/appstore/local-repo
```


>备注： 
此处没使用默认的 `local` repo，而是创建一个新的文件夹并创建一个新的repo演示。
 
### 3.2 在本地启动helm charts repo仓库服务

```
nohup helm serve --address 0.0.0.0:8879 --repo-path /dcos/appstore/local-repo &
```

>备注：
`helm serve` 不指定任何参数的话会在默认的repo目录（`/root/.helm/repository/local`）启动服务，根据该目录下的软件包（`.tgz`）信息在该目录下创建 `index.html` 文件。可以通过指定 `--repo-path` 参数实现在自定义的目录下启动服务，并在那个目录下创建 `index.html` 文件。


### 3.3 通过 `helm repo add` 命令添加本地repo

```
$ helm repo add local-repo http://10.142.21.21:8879
"local-repo" has been added to your repositories
```


### 3.4 查看本地charts仓库是否添加成功

``` 
$ helm repo list
NAME            URL
stable          https://kubernetes-charts.storage.googleapis.com
local           http://127.0.0.1:8879/charts
local-repo      http://10.142.21.21:8879
```


## 4. 向repo中增加软件包
上面步骤中，已经创建了一个本地的repo，接下来讲述如何在repo中增加一个可用来部署的软件包chart。chart须遵循 `SemVer 2` 规则填写正确的版本格式。各种chart包可以在github下载。

### 4.1 将chart文件夹移动到repo目录，并打包

```
cp -r jenkins /dcos/appstore/local-repo/
cd /dcos/appstore/local-repo
helm package jenkins --save=false   
```

>备注:
`helm package` 的作用是在当前目录下将软件打包为tgz，假如这个软件包中有 `requirement.yaml`，则打包时还需要加上 `--dependency-update`，用来update dependencies from "`requirements.yaml`" to dir "`charts/`" before packaging。
`--save=false` 的作用是不将tgz文件再拷贝一份到默认的 `local chart repo` 文件夹（`~/.helm/repository/local/`）下，否则默认会将tgz拷贝一份到那，并检查那个目录下的 `index.html` 是否存在，不存在会报错。或者把没用到的 `local` repo删掉，就不用加 `--save=false` 了。


### 4.2 更新 `index.yaml` 文件 
通过 `helm repo index` 命令将chart的metadata记录更新在 `index.yaml` 文件中:

```
cd /dcos/appstore/local-repo
helm repo index .    
helm repo update
```

>备注： 
这句话的作用是:Read the current directory and generate an index file based on the charts found。`helm index .` 可通过 `--url` 指定repo地址。


### 4.3 验证
查找新上传的chart: 

```
$ helm search jenkins
NAME                    CHART VERSION   APP VERSION DESCRIPTION
local-repo/jenkins      0.16.3          2.107       Open source continuous integration server. It s...
stable/jenkins          0.16.3          2.107       Open source continuous integration server. It s...
```


## 5. 从本地仓库安装chart软件包（即release过程）

```
helm install local-repo/jenkins
```
