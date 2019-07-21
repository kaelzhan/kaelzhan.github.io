---
layout: post
title: 一道华为上机编程题(2)
subtitle: "One huawei computer programming question.(2)"
author: "kaelzhan"
header-img: "img/home/home-bg-girl3.jpg"
date: 2019-07-19
categories: Program
tags: [华为,Program,interview]
description: 一道复杂的编程题。
catalog: true
---


## 背景
前几天又参与了一次华为的线上机考，题目咋一看不难，但实际编程起来却有点复杂。
主要还有时间限制，最后在规定时间内还是没能完成，结束之后又花了一二十分钟才编写完成，记录一下。

## 题目

#### 题目描述

有一批逃犯被囚禁于一座荒岛，荒岛上只有左右方向的一条道路，道路两端各有一座港口，现如果逃犯逃到道路左右
两端的港口就能自由，有的逃犯必须往左逃，有的逃犯必须往右逃，如果逃跑方向相反的逃犯相遇就会发生决斗，
每个逃犯有一定数值的战斗力，决斗后失败的逃犯直接淘汰，胜利的逃犯损失与其决斗的逃犯相同的战斗力，如果决
斗的两个逃犯战斗力相同，则两个逃犯同归于尽。假设所有逃犯逃逸速度相等，并且逃逸方向相同的逃犯都不会发生
决斗。若给定一行整数，每一个整数代表一个逃犯，正数代表逃犯向右逃跑，负数代表逃犯向左逃跑，整数的绝对值
代表逃犯的战斗力，整数在数列中的位置代表逃犯在道路上的初始位置，请编写程序计算出哪些逃犯可以逃出生天。
如果输入异常，请返回\[-1\]

#### 输入描述

逃犯初始状态：\[5 10 8 -8 -5\]

#### 输出描述

能生存的逃犯：\[5 10\]

#### 示例1

输入

>\[5 10 8 -8 -5\]

输出

>\[5 10\]

#### 示例2

输入

>\[-1 1\]

输出

>\[-1 1\]

## 解法

Python3 代码如下。

```python
import sys

inputStr = sys.stdin.readline().strip()
# inputStr = "[7 -2 -5]"   #测试数据

inputList = inputStr.split('[')[1].split(']')[0].split()
inputList = [int(i) for i in inputList]

inList = []
outList = []
result = []

for i in range(len(inputList)):
    inList.append([i,inputList[i]])

def step(stepList):
    for i in range(len(stepList)):
        if stepList[i][1] == 0:
            result.append(-1)
            return
        if (i == len(stepList)-1) and (stepList[i][1] > 0):
            for j in stepList:
                outList.append(j[0])
            return
        if stepList[i][1] < 0:
            if i == 0:
                outList.append(stepList.pop(0)[0])
                step(stepList)
            if i > 0:
                temp = stepList[i-1][1] + stepList[i][1]
                stepList[i-1][1] = temp
                if temp > 0:
                    stepList.pop(i)
                if temp == 0:
                    stepList.pop(i-1)
                    stepList.pop(i-1)
                if temp < 0:
                    stepList[i-1][0] = stepList[i][0]
                    stepList.pop(i)
                step(stepList)
            break

step(inList)
if not result : 
    result = [inputList[i] for i in outList]
result = [str(i) for i in result]

print('['+ ' '.join(result) +']')
```
