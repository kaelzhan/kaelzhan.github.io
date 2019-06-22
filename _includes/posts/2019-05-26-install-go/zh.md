
## Go 语言环境安装
Go 语言支持以下系统：

>- Linux  
>- FreeBSD
>- Mac OS X（也称为 Darwin）
>- Windows

安装包下载地址为：https://golang.org/dl/。  
如果打不开可以使用这个地址：https://golang.google.cn/dl/。

- UNIX/Linux/MacOS 和 FreeBSD 下安装

    - 1、下载二进制包：`go1.4.linux-amd64.tar.gz`。
    - 2、将下载的二进制包解压至 /usr/local目录。
    ```
  tar -C /usr/local -xzf go1.4.linux-amd64.tar.gz
    ```
    - 3、将 `/usr/local/go/bin` 目录添加至PATH环境变量：
    ```
  export PATH=$PATH:/usr/local/go/bin
    ```

    >注意：MAC 系统下你可以使用 `.pkg` 结尾的安装包直接双击来完成安装，安装目录在 `/usr/local/go/` 下。

- Windows 系统下安装

    Windows 下可以使用 `.msi` 后缀(在下载列表中可以找到该文件，如`go1.4.2.windows-amd64.msi`)的安装包来安装。  
    默认情况下 `.msi` 文件会安装在 `c:\Go` 目录下。你可以将 `c:\Go\bin` 目录添加到 PATH 环境变量中。添加后你需要重启命令窗口才能生效。

- 安装测试

    在任意目录下创建 `test.go` 文件

    > test.go 文件代码

    ```
    package main
    
    import "fmt"
    
    func main() {
       fmt.Println("Hello, World!")
    }
    ```

    在终端或命令行下，使用 go 命令执行以上代码输出结果如下：

    >$ go run test.go
    >
    >Hello, World!

## Go 的包管理器 `dep`

>Golang 官方的包管理工具 `dep` 已经很完善了。
 有 `glide` 的拉取标签版本的功能，并且更加强大，跟 `godep` 之间也能无缝转换配置。
 所以现在建议大家都用 [`dep`](https://github.com/golang/dep) 
 
 
#### `dep` 安装

>dep下载链接  
 最新版本下载地址：https://go.equinox.io/github.com/golang/dep/cmd/dep  
 版本发布记录：https://github.com/golang/dep/releases  
 
- MacOS 安装及更新 `dep`
```
$ brew install dep
$ brew upgrade dep
```

- Ubuntu/Debian 安装及更新`dep`
```
$ sudo apt-get install go-dep
```

- Windows 安装及更新`dep`

    - 下载: [github-com-golang-dep-cmd-dep-windows-amd64.zip](https://bin.equinox.io/a/59wHzG494MG/github-com-golang-dep-cmd-dep-windows-amd64.zip)
    - 解压并将`.exe`可执行文件移动到 `%ProgramFiles%\` 
    - 然后在 `PowerShell` 或 `cmd` 中运行 `%ProgramFiles%\dep.exe`

- 其他平台安装  
运行以下命令将安装 `dep` 到您的 `$GOPATH/bin` 目录下面，或者您可以通过使用 `INSTALL_DIRECTORY` 环境变量安装到其他目录。  
  ```
  $ curl https://raw.githubusercontent.com/golang/dep/master/install.sh | sh
  ```
  如果您的平台不被支持，您也可以通过以下源码安装方式手动编译安装。  

- 源码安装  
注意：需要golang环境，然后生成`dep`二进制执行文件，把`dep`放于`PATH`路径下方便后续操作
```
go get -u github.com/golang/dep/cmd/dep
cd github.com/golang/dep/cmd/dep
go build
```

#### 使用 `dep` 创建 go 项目

```
# 创建项目目录
mkdir -p demo/src/app && cd demo/src/app && export GOPATH=`pwd`

# dep 初始化
dep init

# 执行后生成如下文件
tree
# .
# ├── Gopkg.lock # 这个不用管
# ├── Gopkg.toml # 定制三方包规则文件
# └── vendor # 各种三方包文件目录
# 
# 1 directory, 2 files

# 打开Gopkg.toml，开始编辑
# 例如，要添加一个三方包：
# required = ["github.com/gorilla/mux"]

# 修改后执行下面命令进行更新，注意，此时需要建一个正常编译的go文件，我们这里建立一个main.go，内容如下：
# package main
# func main() {}
dep ensure

# 查看vendor目录，需要的包已经安装了
tree vender
# vendor/
# └── github.com
#     └── gorilla
#         ├── context
#         │   ├── context.go
#         │   ├── context_test.go
#         │   ├── doc.go
#         │   ├── LICENSE
#         │   └── README.md
#         └── mux
#             ├── bench_test.go
#             ├── context_gorilla.go
#             ├── context_gorilla_test.go
#             ├── context_native.go
#             ├── context_native_test.go
#             ├── doc.go
#             ├── LICENSE
#             ├── mux.go
#             ├── mux_test.go
#             ├── old_test.go
#             ├── README.md
#             ├── regexp.go
#             └── route.go
# 
# 4 directories, 18 files

# 通常，我们用下面命令查看状态
dep status

# 执行结果如下
# PROJECT                     CONSTRAINT  VERSION  REVISION  LATEST   PKGS USED
# github.com/gorilla/context  v1.1        v1.1     1ea2538   1ea2538  1  
# github.com/gorilla/mux      v1.6.0      v1.6.0   7f08801   7f08801  1 

# 如果我们对三方包有版本要求，比如github.com/gorilla/mux需要1.6.0以下的版本
# 打开Gopkg.toml，添加如下内容：
# [[constraint]]
#   name = "github.com/gorilla/mux"
#   version = "<1.6.0"
# 然后执行：
dep ensure

# 最终查看状态：
dep status
# PROJECT                     CONSTRAINT  VERSION  REVISION  LATEST   PKGS USED
# github.com/gorilla/context  v1.1        v1.1     1ea2538   1ea2538  1  
# github.com/gorilla/mux      <1.6.0      v1.5.0   24fca30   24fca30  1 

# 最终，项目目录结构如下：
tree
# .
# ├── Gopkg.lock
# ├── Gopkg.toml
# ├── main.go
# └── vendor
#     └── github.com
#         └── gorilla
#             ├── context
#             │   ├── context.go
#             │   ├── context_test.go
#             │   ├── doc.go
#             │   ├── LICENSE
#             │   └── README.md
#             └── mux
#                 ├── bench_test.go
#                 ├── context_gorilla.go
#                 ├── context_gorilla_test.go
#                 ├── context_native.go
#                 ├── context_native_test.go
#                 ├── doc.go
#                 ├── LICENSE
#                 ├── mux.go
#                 ├── mux_test.go
#                 ├── old_test.go
#                 ├── README.md
#                 ├── regexp.go
#                 └── route.go
# 
# 5 directories, 21 files

# 详细文档参见：https://github.com/golang/dep/
```