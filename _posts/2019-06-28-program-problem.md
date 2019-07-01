---
layout: post
title: 一道华为上机编程题的多种解法
subtitle: "A variety of solutions of one huawei computer programming question."
author: "kaelzhan"
header-img: "img/home/home-bg-infinity.jpg"
date: 2019-06-28
categories: Program
tags: [华为,Program,interview]
description: 解决编程问题的不同算法。
catalog: true
---


## 背景
前几天参与了一次华为的线上机考，题目是一道编程题，刚拿到题目的时候还是有点懵逼，毕竟作为DevOps不像程序员，没有接触过太多算法问题。
不过仔细思考了十多分钟，还是想出来一个方案，最终圆满解决。不过做完之后不禁思考，是否有其他的方法也能解决，结果还真想出来另一个方法，
所以在这里记录一下。

## 题目

#### 题目描述

小偷来到了一个神秘的王宫，突然眼前一亮，发现5个宝贝，每个宝贝的价值都不一样，且重量也不一样，但是小偷的背包携带重量有限，所以他不得不在宝贝中做出选择，才能使偷到的财富最大，请你帮助小偷计算一下。

#### 输入描述

宝贝价值：6,3,5,4,6
宝贝重量：2,2,6,5,4
小偷背包容量：10

#### 输出描述

偷到宝贝的总价值：15

#### 示例1

输入

>6,3,5,4,6
>
>2,2,6,5,4
>
>10

输出

>15

## 解法1

最初想了十多分钟，想到的办法是可以将每一个宝贝拿或者不拿作为一个独立的条件来循环，那么一共循环2^5次，
也就是32次，就可以循环完所有可能，得到符合背包重量的最大价值，Python3 代码如下。

```python
import sys

inputStr1 = sys.stdin.readline().strip()
inputStr2 = sys.stdin.readline().strip()
inputNum = int(input())

valueSum = 0

valueList = inputStr1.split(',')
weightList = inputStr2.split(',')

def checkChoise(choise):
    weight = 0
    value = 0
    for i in range(5):
        if (choise % 2 ) == 1:
            weight = weight + int(weightList[i])
            value = value + int(valueList[i])
        choise = choise >> 1
    if weight > inputNum:
        return 0
    return value

for x in range(1, 32):
    xn = checkChoise(x)
    if valueSum < xn:
        valueSum = xn
        
print(valueSum)
```

## 解法1改进

做完之后，一直在想有没有什么更好的方法，而首先想到的是一个简单的改进，直接判断一个5位二进制数的某一位
是否为1，而不需要去做移位运算，Python3 代码如下。

```python
import sys

inputStr1 = sys.stdin.readline().strip()
inputStr2 = sys.stdin.readline().strip()
inputNum = int(input())

valueSum = 0

valueList = inputStr1.split(',')
weightList = inputStr2.split(',')

def checkChoise(choise):
    weight = 0
    value = 0
    for i in range(5):
        n = 2**i
        if (choise & n ) == n:
            weight = weight + int(weightList[i])
            value = value + int(valueList[i])
    if weight > inputNum:
        return 0
    return value

for x in range(1, 32):
    xn = checkChoise(x)
    if valueSum < xn:
        valueSum = xn
        
print(valueSum)
```

## 解法2

那又是否还有其他的解法呢，想了许久，觉得类似的问题用递归应该也能解决，于是动手写代码，最终还是写出来了。
Python3 代码如下。在递归中又加入了循环，也因此使用的内存更多，不过代码的通用性更好了，如果宝贝数量改变，
这个代码完全不需要改变就能使用。

```python
import sys
import copy

inputStr1 = sys.stdin.readline().strip()
inputStr2 = sys.stdin.readline().strip()
inputNum = int(input())

valueList0 = inputStr1.split(',')
weightList0 = inputStr2.split(',')

result = []

def checkList(weightList, valueList, weight, value):
    if len(weightList) == 0:
        result.append(value)
        return

    for i in range(len(weightList)):
        weightList1 = copy.deepcopy(weightList)
        valueList1 = copy.deepcopy(valueList)
        weight1 = copy.deepcopy(weight)
        value1 = copy.deepcopy(value)  

        weight1 = weight1 + int(weightList1.pop(i))
        if weight1 <= inputNum:
            value1 = value1 + int(valueList1.pop(i))
        checkList(weightList1, valueList1, weight1, value1)
        
checkList(weightList0, valueList0, 0, 0)
   
print(max(result))
```

## 解法2改进

解法2也还能改进，当总重量达到背包上限的时候就可以结束当次循环，减少运算量。

```python
import sys
import copy

inputStr1 = sys.stdin.readline().strip()
inputStr2 = sys.stdin.readline().strip()
inputNum = int(input())

valueList0 = inputStr1.split(',')
weightList0 = inputStr2.split(',')

result = []

def checkList(weightList, valueList, weight, value):
    if len(weightList) == 0:
        result.append(value)
        return

    for i in range(len(weightList)):
        weightList1 = copy.deepcopy(weightList)
        valueList1 = copy.deepcopy(valueList)
        weight1 = copy.deepcopy(weight)
        value1 = copy.deepcopy(value)  

        weight1 = weight1 + int(weightList1.pop(i))
        if weight1 > inputNum:
            result.append(value)
            continue
        value1 = value1 + int(valueList1.pop(i))
        checkList(weightList1, valueList1, weight1, value1)
        
checkList(weightList0, valueList0, 0, 0)
   
print(max(result))
```