## 执行上下文

生命周期：

	创建阶段： 生成变量对象，建立作用域链，确定this指向
	执行： 变量赋值，函数引用，执行其他代码

## 变量对象

创建arguments对象 ---》 检查function函数声明 --》 检查var变量声明创建属性

var声明的变量当遇到同名的属性时，会跳过而不会覆盖

## 作用域与闭包

编译阶段确定作用域规则，执行阶段创建执行上下文

作用域链，是由当前环境与上层环境的一系列变量对象组成，它保证了当前执行环境对符合访问权限的变量和函数的有序访问

闭包是一种特殊的对象。它由两部分组成。执行上下文(代号A)，以及在该执行上下文中创建的函数（代号B）。当B执行时，如果访问了A中变量对象中的值，那么闭包就会产生。

闭包产生条件

- 闭包是在函数被调用执行的时候才被确认创建的。
- 闭包的形成，与作用域链的访问顺序有直接关系。
- 只有内部函数访问了上层作用域链中的变量对象时，才会形成闭包，因此，我们可以利用闭包来访问函数内部的变量。

## this 

this的指向，是在函数被调用的时候确定的.

如果调用者函数，被某一个对象所拥有，那么该函数在调用时，内部的this指向该对象。如果函数独立调用，那么该函数内部的this，则指向undefined。但是在非严格模式中，当this指向undefined时，它会被自动指向全局对象。

new创建过程:

- 创建一个新的对象；
- 将构造函数的this指向这个新对象；
- 指向构造函数的代码，为这个对象添加属性，方法等；
- 返回新对象。

## 函数式编程

函数参数传递方式：按值传递

柯里化：柯里化是指这样一个函数(假设叫做createCurry)，他接收函数A作为参数，运行后能够返回一个新的函数。并且这个新的函数能够处理函数A的剩余参数。

## 面向对象

创建对象的几种方式

- var obj = new Object();
- var obj = {};
- 工厂模式

```js
var createPerson = function(name, age) {

    // 声明一个中间对象，该对象就是工厂模式的模子
    var o = new Object();

    // 依次添加我们需要的属性与方法
    o.name = name;
    o.age = age;
    o.getName = function() {
        return this.name;
    }

    return o;
}
```

- 构造函数

```js
var Person = function(name, age) {
    this.name = name;
    this.age = age;
    this.getName = function() {
        return this.name;
    }
}
```

- 原型 (函数有prototype.实例对象时__proto__)

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// 通过prototye属性，将方法挂载到原型对象上
Person.prototype.getName = function() {
    return this.name;
}

var p1 = new Person('tim', 10);
var p2 = new Person('jak', 22);
console.log(p1.getName === p2.getName); 
```

- 原型链继承









