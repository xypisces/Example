python3 manage.py createsuper

## 创建表单

新建一个form.py文件同于存储表单功能

```
from django import forms

class Commentform(forms.form):
    name = forms.CharField(max_length=50)
    comment = forms.CharField()
    
```
## GET和POST的使用
 
## url跳转问题

正则匹配模式

^abc$ 前后匹配
/detail/(\d){3} 匹配三位数字
／detail/(\d+) 匹配多位数字

## 视图分离

> 上帝归上帝，凯撒归凯撒

## model层中的多对一关系

```
belong_to = models.ForeignKey(to=Aritcle, related_name='under_comments', null=True, blank=True)

```

## 分页功能

```
list = Paginator(video_list,9)
video_list = list.page(request.GET.get('page'))
```

异常处理

```
try:
	video_list = list.page(page_num)
except EmptyPage:
	video_list = list.page(page.num_pages) //最后一页
except PageNot:
	video_list = list.page(1) //第一页
```

## 分类功能

```

```












