## 字符串的不可逆性
在JS中，字符串属于基本数据类型，所以给变量赋值时会生成一个新的内存地址，而python中相同的字符串，其内存地址是相同

```python
// 通过id函数可以得出值的内存地址
a = 'hello'
b = 'hello'
id(a) = id(b) //true
```
## 类的私有属性／特殊属性／字典数据类型

```
class Dog:
	age
	__sex //前缀有__属于私有变量
	def wa:
		print('wawa')
	
／／ 如何访问私有变量
dog = Dog()
Dog._Dog__sex //加上类名就可以访问私有变量
```

```
__doc__ //获取文档内容
__name__ //获取函数名
__dict__ //获取当前对象的属性 
__locals()__ //函数作用域内
__globle()__ //全局
```

区分

- import abs
- from abs import *

第二种方式会把abs文件中的属性导入到当前文件的locals()表当中，
而第一种只有一个路径

## 爬虫

```
from urllib.request import urlopen
response  = urlopen(http://quote.eastmoney.com/center/paihang.html)
html = response.read() //读取html的body
# 将数据写入文件中存储
with open('./htmls/1.txt','wb') as f:
	f.write(html.decode('gb2312').encode('utf8') #字符集不同需要转化
	f.close()
# print(html.decode('gb2312') //转化中文编码
```









