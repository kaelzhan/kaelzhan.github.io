---
layout: post
title: Markdown 技巧汇编
subtitle: "Markdown tips"
author: "kaelzhan"
mathjax: true
date: 2020-07-07
categories: Write
tags: [Write,markdown,program]
description: Use markdown efficiently
catalog: true
---

# 基本语法 Basic grammar
## 标题 Title

在想要设置为标题的文字前面加 # 来声明标题  
一个 # 是一级标题，二个 # 是二级标题，以此类推。支持六级标题。  

>注：标准语法需要在 # 后跟一个空格再写其他文字

示例:
```
# 这是一级标题
## 这是二级标题
### 这是三级标题
#### 这是四级标题
``` 

效果如下:
# 这是一级标题
## 这是二级标题
### 这是三级标题
#### 这是四级标题

## 字体 Font
### 粗体 Bold
要加粗的文字左右分别用两个*号包起来  

### 斜体 Italic
要倾斜的文字左右分别用一个*号包起来  

### 斜体加粗 Italic bold
要倾斜和加粗的文字左右分别用三个*号包起来

### 删除线 Strikethrough
要加删除线的文字左右分别用两个~~号包起来  

示例:  
```
**这是粗体文字**  
*这是斜体文字*  
***这是斜体加粗的文字***  
~~这是加删除线的文字~~  
```

效果如下:

**这是粗体文字**  
*这是斜体文字*  
***这是斜体加粗的文字***  
~~这是加删除线的文字~~

## 引用 Quote
在引用的文字前加>即可。引用也可以嵌套，如加两个>>,三个>>>,n个>>...>>
Examples:  
```
>这是引用的内容
>>这是引用的内容
>>>>>>这是引用的内容
```

效果如下:  

>这是引用的内容
>>这是引用的内容
>>>>>>这是引用的内容

## 分割线 Split line
三个或者三个以上的 - 或者 * 都可以。

示例:  
```
---
----
***
*****
```

效果如下:  

---
----
***
*****

## 图片 Picture
![图片alt](图片地址 ''图片title'')

>图片alt就是显示在图片下面的文字，相当于对图片内容的解释。  
>图片title是图片的标题，当鼠标移到图片上时显示的内容。title可加可不加

示例:
```
![blockchain](https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/
u=702257389,1274025419&fm=27&gp=0.jpg "区块链")
```

效果如下:  
![blockchain](https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=702257389,1274025419&fm=27&gp=0.jpg "区块链")


# 代码块 Code block
## 普通代码块 Ordinary code block

You can use ``` to write a code block. 
````
```javascript
var aaa = function(){
  let foo = 'foo'
  let bar = 'bar'
  console.log(foo + bar) // print foobar
  console.log(`google is a searche engine ${foo}`)
}
```
````

It will looks like
```javascript
var aaa = function(){
  let foo = 'foo'
  let bar = 'bar'
  console.log(foo + bar) // print foobar
  console.log(`google is a searche engine ${foo}`)
}
```

### 在代码块中使用反引号 `

When you want to use \` in a code block, you can use ```` like below.
````
```` // write 4 ` here to start a block with `
```javascript
var aaa = function(){
  let foo = 'foo'
  let bar = 'bar'
  console.log(foo + bar) // print foobar
  console.log(`google is a searche engine ${foo}`)
}
```
```` // write 4 ` here to close
````

Then it looks like
````
```javascript
var aaa = function(){
  let foo = 'foo'
  let bar = 'bar'
  console.log(foo + bar) // print foobar
  console.log(`google is a searche engine ${foo}`)
}
```
````

# 表格 Table
## 普通表格 Ordinary form

Generally, we use forms in markdown like this
```
| 姓名 | 年龄 |  爱好 |
| -- | -- | -- |
| 小明 | 9 | 篮球 |
| 小刚 | 10 | 篮球、足球 |
```

It looks like
| 姓名 | 年龄 |  爱好 |
| -- | -- | -- |
| 小明 | 9 | 篮球 |
| 小刚 | 10 | 篮球、足球 |

## 设置对齐方式 Set alignment

|:--:| 居中对齐、|:--| 左对齐、|--:| 右对齐。

```
| 姓名 | 年龄 |  爱好 |
| :--: | :-- | --: |
| 小明 | 9 | 篮球 |
| 小刚 | 10 | 篮球、足球 |
```

It shows
| 姓名 | 年龄 |  爱好 |
| :--: | :-- | --: |
| 小明 | 9 | 篮球 |
| 小刚 | 10 | 篮球、足球 |

## 表格内容换行 Wrap table content

Markdown本身不提供单元格换行，但是，Markdown是兼容HTML的，因此，我们可以通过HTML的方式实现单元格换行。
```
| 姓名 | 年龄 |  爱好 |
| :-- | :-- | :-- |
| 小明 | 9 | 篮球 |
| 小刚 | 10 | 篮球 <br> 足球 |
```
It shows
| 姓名 | 年龄 |  爱好 |
| :-- | :-- | :-- |
| 小明 | 9 | 篮球 |
| 小刚 | 10 | 篮球 <br> 足球 |

## 合并单元格 Cell merge

>合并单元格还是要与HTML网页结合起来，来达到效果。  
>这会用到HTML的标签：  
>>colspan：规定单元格可纵深的列数  
>>rowspan：规定单元格可横跨的行数  

### 合并表格行
```
<table>
    <tr>
        <td>张</td>
        <td>王</td>
    <tr>
    <tr>
        <td colspan="2">姓氏</td>
    <tr>
</table>
```

效果如下
<table>
    <tr>
        <td>张</td>
        <td>王</td>
    <tr>
    <tr>
        <td colspan="2">姓氏</td>
    <tr>
</table>

### 合并表格列
```
<table>
    <tr>
        <td>类别</td>
        <td>名称</td>
    </tr>
    <tr>
        <td rowspan="2">颜色</td>
        <td>红色</td>
    </tr>
    <tr>
        <td>黄色</td>
    </tr>
    <tr>
        <td rowspan="2">姓氏</td>
        <td>张</td>
    </tr>
    <tr>
        <td>王</td>
    </tr>
</table>
```

效果如下
<table>
    <tr>
        <td>类别</td>
        <td>名称</td>
    </tr>
    <tr>
        <td rowspan="2">颜色</td>
        <td>红色</td>
    </tr>
    <tr>
        <td>黄色</td>
    </tr>
    <tr>
        <td rowspan="2">姓氏</td>
        <td>张</td>
    </tr>
    <tr>
        <td>王</td>
    </tr>
</table>

### 综合使用
```
<table>
    <tr>
        <td>类别</td>
        <td>名称</td>
    </tr>
    <tr>
        <td rowspan="2">颜色</td>
        <td>红色</td>
    </tr>
    <tr>
        <td>黄色</td>
    </tr>
    <tr>
        <td colspan="2">姓氏</td>
    </tr>
    <tr>
        <td>王</td>
        <td>张</td>
    </tr>
</table>
```

效果图:
<table>
    <tr>
        <td>类别</td>
        <td>名称</td>
    </tr>
    <tr>
        <td rowspan="2">颜色</td>
        <td>红色</td>
    </tr>
    <tr>
        <td>黄色</td>
    </tr>
    <tr>
        <td colspan="2">姓氏</td>
    </tr>
    <tr>
        <td>王</td>
        <td>张</td>
    </tr>
</table>