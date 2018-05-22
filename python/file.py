# I/O 操作

try:
  f = open('./fileconfig.py','r')
  # print(f.read())
  print('-------')
  for line in f.readlines():
    print(line.strip()) # 去掉末尾的/n
finally:
  if f:
    f.close()

# with open('/path/to/file', 'r') as f:
#   print(f.read())


# 序列化
# json.dumps() 对象转成json
# json.loads() json转成对象
import json

class Student(object):
  def __init__(self, name, age, score):
      self.name = name
      self.age = age
      self.score = score

s = Student('Bob', 20, 88)
print(json.dumps(s, default = lambda x: x.__dict__))