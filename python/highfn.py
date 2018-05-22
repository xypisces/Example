# __slots__ 用于限制类的属性,但是对继承的子类没有效果

class Student(object):
  __slots__ = ('name', 'age')

# Python内置的@property装饰器就是负责把一个方法变成属性调用的
class Students(object):
  @property
  def score(self):
    return self._score
  @score.setter
  def score(self, value):
    if not isinstance(value, int):
        raise ValueError('score must be an integer!')
    if value < 0 or value > 100:
        raise ValueError('score must between 0 ~ 100!')
    self._score = value

# 错误处理
try:
    print('try...')
    r = 10 / 0
    print('result:', r)
except ZeroDivisionError as e:
    print('except:', e)
finally:
    print('finally...')
print('END')

# 调试
# print, assert logging
# python -m pdb xxx.py 进行单步调试