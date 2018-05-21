import os

print('process (%s) ...' %os.getpid())

pid = os.fork()
if pid == 0:
  print('i am child process %s and my parent is %s' %(os.getpid(), os.getppid()))
else:
  print('i %s just create child process %s' %(os.getpid(), pid))

# 操作系统自动把当前进程（称为父进程）复制了一份（称为子进程），然后，分别在父进程和子进程内返回。

# windows 下使用 multiprocess

#如果要启动大量的子进程 Pool
from multiprocessing import Pool
import os, time, random

def long_time_task(name):
  print('Run task %s (%s)...' % (name, os.getpid()))
  start = time.time()
  time.sleep(random.random() * 3)
  end = time.time()
  print('Task %s runs %0.2f seconds.' % (name, (end - start)))

if __name__=='__main__':
  print('Parent process %s.' % os.getpid())
  p = Pool(4)
  for i in range(5):
      p.apply_async(long_time_task, args=(i,))
  print('Waiting for all subprocesses done...')
  p.close()
  p.join()
  print('All subprocesses done.')