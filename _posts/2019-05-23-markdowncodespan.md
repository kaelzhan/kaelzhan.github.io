---
layout: post
title: Markdown 代码块与语法高亮
date: 2019-05-23
categories: 写作
tags: [写作,Program,Markdown]
description: 简洁的编程式写作方式：Markdown。
---

# 目录

* [1. 语法说明](#1-语法说明)
* [2. 行内式代码插入](#2-行内式代码插入)
* [3. 多行代码插入与语法高亮](#3-多行代码插入与语法高亮)
* [4. 缩进式多行代码插入](#4-缩进式多行代码插入)


## 1. 语法说明
插入程序代码的方式有两种，一种是利用缩进(Tab), 另一种是利用 ` 符号（～键）包裹代码。

- 插入行内代码，即插入一个单词或者一句代码的情况，使用 `code` 这样的形式插入。
- 插入多行代码，用的最多的是，用前后各3个 ` 包裹多行代码。当然也可以使用缩进或者“` code `”的形式。



## 2. 行内式代码插入
在一般的段落文字中，可以使用反引号 \` 来标记或插入代码块

- 代码：  
C语言里的函数  \`scanf()\`  怎么使用？

- 显示效果：  
C语言里的函数 `scanf()` 怎么使用？  

当然也可以标记汉字，\`卖萌\`，标记后`卖萌`，不过一般不会用来标记汉字。

## 3. 多行代码插入与语法高亮
- 在需要高亮的代码块的前一行及后一行各使用三个反引号``` (～键)可标记代码块。
- 第一行三个反引号后面，输入代码块所使用的语言，可语法高亮。

下面是分别使用 php  python3  c  ruby 语言写的，打印 "Hello World!" 的代码，用对应的语言对代码进行高亮显示。当然高亮显示的主题每个 Markdown 编辑器可能不同。

- php代码块语法高亮书写格式：

>\`\`\`php  
>\<?php  
>echo "Hello World!";  
>?>  
>\`\`\`  



- python代码块语法高亮书写格式：

>\`\`\`python  
>#!/usr/bin/python3  
>  
>print("Hello, World!");  
>\`\`\`



- c代码块语法高亮书写格式：

>\`\`\`c  
>#include \<stdio.h\>  
>  
>int main()  
>{  
>&emsp; &emsp;   /* 我的第一个 C 程序 */  
>&emsp; &emsp;   printf("Hello, World! \n");  
>  
>&emsp; &emsp;   return 0;  
>}  
>\`\`\`



- ruby代码块语法高亮书写格式：

>\`\`\`ruby  
>#!/usr/bin/ruby  
>  
>puts "Hello World!";  
>\`\`\`  



- 显示效果：  
  
```php
<?php 
echo "Hello World!"; 
?> 
```

  
  
```python
#!/usr/bin/python3

print("Hello, World!");
```


  
```c
#include <stdio.h>

int main()
{
   /* 我的第一个 C 程序 */
   printf("Hello, World! \n");

   return 0;
}
```


  
```ruby
#!/usr/bin/ruby

puts "Hello World!";
```



代码块中，一般的 Markdown 语法不会被转换，像是 * 便只是星号，这表示你可以很容易地以 Markdown 语法撰写 Markdown 语法相关的文件。

## 4. 缩进式多行代码插入
注意： 缩进式插入前方必须有空行
缩进 4 个空格或是 1 个制表符
一个代码区块会一直持续到没有缩进的那一行（或是文件结尾）。

代码： 
>&emsp; &emsp;  
>&emsp; &emsp;    #include  \<stdio.h\>  
>&emsp; &emsp;    int main(void)  
>&emsp; &emsp;    {  
>&emsp; &emsp;&emsp; &emsp;        printf("Hello world\n");  
>&emsp; &emsp;    }  
  
  
显示效果：

    #include  <stdio.h>
    int main(void)
    {
        printf("Hello world\n");
    }
