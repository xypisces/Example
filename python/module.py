
# 模块
import sys

def test():
  args = sys.argv
  if len(args) == 1:
    print('hello world')
  elif len(args) == 2:
    print('hello %s' %args[1])
  else:
    print('too many argument')

if __name__ == '__main__':
  test()

# 作用域

# 类和实例

class Student(object):
  def __init__(self, name, score, number):
    self.name = name
    self.score = score
    self.__number = number  #私有变量，限制访问  但是可以通过 实例._类名__number 来访问
  def print_score(self):
    print('%s: %s' %(self.name, self.score))
    print('%s' %(self.__number))

bear = Student('xuyu', 11, 22)
bear.print_score()

# 继承和多态
# 获取对象信息
type(123)
# <class 'int'>
isinstance(123,int)
isinstance([1, 2, 3], (list, tuple))
dir('ABC') #获得一个对象的所有属性和方法
#，配合getattr()、setattr()以及hasattr()，我们可以直接操作一个对象的状态：