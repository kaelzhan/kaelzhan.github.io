
# Go 语言环境安装
Go 语言支持以下系统：

>- Linux  
>- FreeBSD
>- Mac OS X（也称为 Darwin）
>- Windows

安装包下载地址为：https://golang.org/dl/。

如果打不开可以使用这个地址：https://golang.google.cn/dl/。


## UNIX/Linux/Mac OS X, 和 FreeBSD 安装
以下介绍了在UNIX/Linux/Mac OS X, 和 FreeBSD系统下使用源码安装方法：

- 1、下载二进制包：`go1.4.linux-amd64.tar.gz`。

- 2、将下载的二进制包解压至 /usr/local目录。

```
tar -C /usr/local -xzf go1.4.linux-amd64.tar.gz
```

- 3、将 `/usr/local/go/bin` 目录添加至PATH环境变量：

```
export PATH=$PATH:/usr/local/go/bin
```

注意：MAC 系统下你可以使用 `.pkg` 结尾的安装包直接双击来完成安装，安装目录在 `/usr/local/go/` 下。

## Windows 系统下安装
Windows 下可以使用 `.msi` 后缀(在下载列表中可以找到该文件，如`go1.4.2.windows-amd64.msi`)的安装包来安装。

默认情况下.msi文件会安装在 `c:\Go` 目录下。你可以将 `c:\Go\bin` 目录添加到 PATH 环境变量中。添加后你需要重启命令窗口才能生效。

安装测试
创建工作目录 `C:\>Go_WorkSpace`。

test.go 文件代码：

```
package main

import "fmt"

func main() {
   fmt.Println("Hello, World!")
}
```

使用 go 命令执行以上代码输出结果如下：

>C:\Go_WorkSpace>go run test.go
>
>Hello, World!