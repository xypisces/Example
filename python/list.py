# 列表生成
# l = []
# for x in range(1,11):
#   l.append(x*x)
# print(l)

# l = [m + n for m in 'ABC' for n in 'abc']  # 两层嵌套
# print(l)

# L1 = ['Hello', 'World', 18, 'Apple', None]
# L2 = [s.lower() for s in L1 if isinstance(s, str)]  # 判断是否为字符串
# print(L2)

# 生成器   --- 节省内存空间
# g = (x*x for x in range(10)) # （）用于产生生成器
# print(next(g))
# for n in g:
#   print('123',n)  #如果前面调用了next(),循环不是从头来过

# 生成器函数
# def fib(max):
#   n, a, b = 0,0,1
#   while n<max:
#     yield b
#     a, b = b, a+b
#     n = n+1
#   return 'done'
# f = fib(6)
# while True:
#   try:
#     x = next(f)
#     print(x)
#   except StopIteration as e:
#     print('Generator return value:', e.value)
#     break

# def fn(num):
#   result = [1]
#   n = 0
#   while n<num:
#     yield result
#     result = [1] + [result[x]+result[x+1] for x in range(len(result) - 1)] + [1]
#     n = n + 1
#   return 'done'
# g = fn(7)
# for s in g:
#   print(s)

# 迭代器


