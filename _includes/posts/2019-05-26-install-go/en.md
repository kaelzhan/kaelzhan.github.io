
## Go Installation
Go is supported on all the three platforms Mac, Windows and Linux. You can download the binary for the corresponding platform from https://golang.org/dl/

- Mac OS  
Download the OS X installer from https://golang.org/dl/. Double tap to start the installation. Follow the prompts and this should have Golang installed in `/usr/local/go` and would have also added the folder `/usr/local/go/bin` to your `PATH` environment variable.

- Windows  
Download the MSI installer from https://golang.org/dl/. Double tap to start the installation and follow the prompts. This will install Go in location `c:\Go` and will also add the directory `c:\Go\bin` to your path environment variable.

- Linux  
Download the tar file from https://golang.org/dl/ and unzip it to `/usr/local`.
Add `/usr/local/go/bin` to the `PATH` environment variable. This should install Go in linux.

- Test Go  
Create `test.go` like below in any directory
  ```
  package main
    
  import "fmt"
    
  func main() {
     fmt.Println("Hello, World!")
  }
  ```
    Run `go run` command with above file, you can see output like below：

    >$ go run test.go
    >
    >Hello, World!

## Go package manage Tool `Dep`

>dep is a dependency management tool for Go. It requires Go 1.9 or newer to compile.  
 dep was the "official experiment." The Go toolchain, as of 1.11, has adopted an approach that sharply diverges from dep. As a result, we are continuing development of dep, but gearing work primarily towards the development of an alternative prototype for versioning behavior in the toolchain.


#### Installation
You should use an officially released version. Release binaries are available on the [releases](https://github.com/golang/dep/releases) page.

On MacOS you can install or upgrade to the latest released version with Homebrew:
```
$ brew install dep
$ brew upgrade dep
```
On Debian platforms you can install or upgrade to the latest version with apt-get:
```
$ sudo apt-get install go-dep
```
On Windows, you can download a tarball from go.equinox.io.

On other platforms you can use the install.sh script:
```
$ curl https://raw.githubusercontent.com/golang/dep/master/install.sh | sh
```
It will install into your $GOPATH/bin directory by default or any other directory you specify using the INSTALL_DIRECTORY environment variable.

If your platform is not supported, you'll need to build it manually or let the team know and we'll consider adding your platform to the release builds.

If you're interested in getting the source code, or hacking on dep, you can install via go get:
```
go get -u github.com/golang/dep/cmd/dep
```
