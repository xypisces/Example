#!/usr/bin/env python3
# _*_ coding: utf-8 _*_

' a test module '

__author__ = 'xuyu'


# map/reduce

from functools import reduce
def fn(x,y):
  return x * 10 + y
def char2num(s):
  digits = {"0":0,"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9}
  return digits[s]
val = reduce(fn, map(char2num, '13679'))
print(isinstance(val, int))
c = int('123')
print(isinstance(c, int))

# filter

l = [1,2,3,4,5,6,7]
def fi(n):
  return n < 5
l1 = list(filter(fi,l))
print(l1)

# sorted
sorted(['bob', 'about', 'Zoo', 'Credit'], key=str.lower, reverse=True)

# 闭包
def createCounter():
    def num():
        n = 1
        while 1:
            yield n
            n = n + 1

    n = num()
    def counter():
        return next(n)
    return counter
f1 = createCounter()
print(f1())
print(f1())
print(f1())

# 匿名函数 lambda
f = lambda x : x + x
print(f(5))

# 装饰器
def log(func):
  def wrapper(*args, **kw):
    print('call %s():' %func.__name__)
    return func(*args, **kw)
  return wrapper

@log
def now():
  print('2019-09-09')
now()

# 偏函数
# 当函数的参数个数太多，需要简化时，使用functools.partial可以创建一个新的函数，这个新函数可以固定住原函数的部分参数，从而在调用时更简单。
def int2(x, base=2):
    return int(x, base)

import functools
int2 = functools.partial(int, base=2)