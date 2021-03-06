---
layout: post
title: 现在开始使用 ES6
date: '2015-02-27 17:08:57'
---

在 2 月 20 号 ECMAScript 第六版就正式推出了，这门语言一直保持稳定快速的发展而且新功能也在慢慢被现在主流的 JavaScript 引擎所接受。不过要想在浏览器端或者 Node 端直接运行 ES6 代码还得等上一些日子。幸好 TC39 (负责研究开发 EMCAScript 规格的组织) 做了大量工作让我们现在可以使用 ES6 中的大部分特性了。

## 代码转换

能够实现 ES6 到 ES5 的代码转换多亏了 [Babel](https://babeljs.io/) (以前叫 6to5) 以及 Traceur 之类的项目。这些转换器 (更准确地说是源代码到源代码的编译器) 可以把你写的符合 ECMAScript 6 标准的代码完美地转换为 ECMAScript 5 标准的代码，并且可以确保良好地运行在所有主流 JavaScript 引擎中。

我们这里目前在使用 Babel，主要是因为它对 ES6 的支持程度比其它同类[更高](https://kangax.github.io/compat-table/es6/#babel)，而且 Babel 拥有完善的文档和一个很棒的[在线交互式编程环境](https://babeljs.io/repl/)。

## 起步

在用 ES6 标准开始一个新项目的时候我们会建立一个目录结构来确保用 ES6 编写的代码能和编译出的 ES5 代码区分开。原始的 ES6 代码我们放在 `src` 目录下，而编译好的文件就是 `lib` 目录。这样的命名我们会在本文一直使用。（补充一点，`lib` 目录应该被加入 `.gitignore` 文件中）

### 安装 Babel

如果你还没安装 Babel 可以使用 [npm]((https://www.npmjs.org) 来安装：

```bash
npm install -g babel
```

Babel 一旦安装完成就可以开始编译你的 ES6 代码了。再确认一遍你已经在 `src` 目录放入了一些 ES6 文件，下面的命令将会把这个目录下所有 `.es6`, `.es` 和 `.js` 后缀的文件编译成符合 ES5 规范的代码到 `lib` 目录下：

```bash
babel -d lib/ src/
```

如果你想在文件有改动的时候自动完成这些编译工作可以使用这些常用的 JavaScript 构建工具：[Grunt](https://github.com/babel/grunt-babel), [Gulp](https://github.com/babel/gulp-babel) 和 [Brocolli](https://github.com/babel/broccoli-babel-transpiler).

### 给 ES6 标准库一个"腻子"

Babel 作为一个源到源的编译器不可能呈现所有 ES6 标准库中的新特性，例如 `Map` 和 `Set` 构造器和 `Array` 下的一些新方法。要使用这些我们需要一个"腻子"来填补这些不足。现在有很多 ES6 的腻子比如 [core-js](https://github.com/zloirock/core-js)，它适用于 Node, io.js 和浏览器。

>译者注: 本节原始标题为 Polyfilling the standard library，术语 polyfill 来自于一个家装产品Polyfilla:
>
>Polyfilla 是一个英国产品，在美国称之为 Spackling Paste (刮墙的,在中国称为腻子)。记住这一点就行: 把旧的浏览器想象成为一面有了裂缝的墙.这些 polyfill 会帮助我们把这面墙的裂缝抹平,还我们一个更好的光滑的墙壁 (浏览器)

## 编写 ES6 代码

现在构建 ES6 代码的工具已经备齐了那我们就开始真正有趣的部分。我们不会过多着眼于某个新特性，如果你有需要可以阅读 [Luke Hoban](https://github.com/lukehoban) 的 [feature list](https://github.com/lukehoban/es6features).

我们先在 `src` 目录下创建一个叫 `person.es6` 的文件：

```javascript
import 'core-js/shim';

export default class Person {

  constructor( name ) {
    this.name = name;
  }

  sayHello() {
    return `Hello ${ this.name }!`;
  }

  sayHelloThreeTimes() {
    let hello = this.sayHello();
    return `${ hello } `.repeat(3);
  }
}
```

在这个很简单的例子中我们用了数个需要 Babel 来解决兼容性的语法，还有一个新的方法 `String#repeat` 须要由 core-js 处理。你可以用本文开头给出的 Babel 命令行代码或者用 [REPL](http://ow.ly/JJyhz) 得到运行结果。

### 发布到 npm

目前为止我们可以编写、编译和运行 ES6 代码，不过你也许还想把你的代码发布到 npm 上。你显然不能直接发布然后期望每个人都来自己编译一次。

幸好，npm 允许你在发布前用 [`prepublish` script](https://docs.npmjs.com/misc/scripts) 选项来修改，这个特性在 CoffeeScript 项目中已经被广泛使用了。

现在把 `package.json` 文件加入到项目根目录中：

```json
{
  "name": "person",
  "version": "0.1.0",
  "scripts": {
    "compile": "babel -d lib/ src/",
    "prepublish": "npm run compile"
  },
  "main": "lib/person.js",
  "dependencies": {
    "core-js": "^0.6.0"
  },
  "devDependencies": {
    "babel": "^4.6.0"
  }
}
```

注意这个 `compile` script 会直接运行你在右边提供 Babel 命令，这样你就可以直接运行 `npm run compile` 来编译而不需要键入文件目录了，而 `prepublish` script 会在你每次执行 `npm publish` 的时候自动运行。

还有就是为什么 Babel 会被加入 development dependencies 中，这样如果有人想参与这个项目就不用全局安装 Babel 了，npm 会在项目下的 `node_modules` 目录中加入相关的可执行文件。

### .npmignore 文件

最后你需要确保发布的是编译出的文件而不是原始的 ES6 文件。如果你的项目根目录有 `.gitignore` 而没有 `.npmignore` 那 npm 就会自动忽略你项目中包含在 `.gitignore` 里所有的 文件和目录。添加 `.npmignore` 这样你发布的包里就是编译好的文件：

```
src/
```

## 总结

- 编写 ES6 代码并使用源到源的编译器如 [Babel](https://babeljs.io/) 或者 [Traceur](https://github.com/google/traceur-compiler) 来转换成标准 ES5 代码
- 使用 ES6 标准库腻子如 [core-js](https://github.com/zloirock/core-js)
- 记得在发布到 npm 的时候添加 `.npmignore` 文件

你可以在我们的 [update-couch-designs](https://github.com/mammaldev/update-couch-designs) 项目中看到一个完整的例子，这个项目是我们用于更新和新建 CouchDB 设计文档的简单脚本。

翻译自 [Using ES6 with npm today](http://mammal.io/articles/using-es6-today/)