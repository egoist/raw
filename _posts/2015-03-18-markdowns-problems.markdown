---
layout: post
title: Markdown 的问题与人
date: '2015-03-18 08:21:06'
---

王垠在几年前的[文章](http://www.yinwang.org/blog-cn/2013/04/14/markdown/)里谈到了一些 Markdown 的问题，除去现在已经被各种 common Markdown 改善的之外似乎还有几个值得一说。

## 缩进

由于在写代码时可以用一对三个反引号包围代码实现高亮，所以我不知道王垠在说什么。其它需要缩进的也只是如列表用到了空格。

## 特殊字符

在输入 `x*y` 这样的表达式的时候是不会触发任何 Markdown 解析操作的。

## 表达力有限

如果你追根溯源你会知道 Markdown 起初只不过是 John Gruber 设计来满足自己写博客的需要的，表达力有限地其实刚刚好。Inline HTML 就是给王垠的候补。

而且当你知道 GitHub Flavoured Markdown 支持这样简单的语法来生成 todolist 的时候你无疑是很兴奋的：

```
- [ ] todo list item 1
- [ ] todo list item 2
- [x] todo list item 3 and done
```
---

其实王垠大部分是在强调 Markdown 的 “呈现效果” 而忽略了写作者的 “写作感受” 与其之间的平衡。对于抱怨 Markdown 也有语法需要学习的同学，提一句，Markdown 的语法里可是看不到一个英文字母的。

Markdown 不是 TeX，这些简单的语法学习之后你很难忘记，你总是需要写作的，而每次你都能从中受益。

其实对于 Markdown 我唯一的两个抱怨就是一个换号符不能真正地换行而两个就变成分段了，以及没有一个统一的涵盖最全的 common Markdown 语法标准。