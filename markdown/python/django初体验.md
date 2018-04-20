之前用过django，后来忘了一干二净。才发现做blog记录的重要性，
> 好记性不如烂笔头

### django安装
因为我在mac下有python3和python2,python3下面自带了pip,所以使用python3进行开发咯。

```
python3 -m pip install django
```

查看django版本

```
python3
>>> import django
>>> print(django.VERSION） //(x.xx.x,final,0)
```

### 项目初始化

安装了django后使用django-admin在项目下进行初始化

```
django-admin helloworld
cd helloworld
python3 manage.py migrate //创建数据库
python3 manage.py runserver //启动django项目
```

这时候就可以在localhost://8000是否能够访问，成功就代表启动成功了

### 创建一个app

python3 manage.py startapp helloapp //创建一个django的app

1.在helloapp下的model是进行数据的初始化,类似于数据的建表行为.

```
// models.py
class People(models.Model):
    name = models.CharField(null=True, blank=True, max_length=200)
    job= models.CharField(null=True, blank=True, max_length=200)  

```
然后运行 python3 manage.py makemigrations 以及 python3 manage.py migrate 生成真正的数据库

2.接下来是views是进行视图的处理

```html
// views.py
from django.shortcuts import render, HttpResponse
from helloapp.models import People
from django.template import Context, Template
def helloworld(request):
    person = People(name='xuyu', job='webfront')
    html_string = '''
    <html>
        <body>
            <h1> {{ person.name }} </h1>
            <h1> {{ person.job }} </h1>
        </body>
    </html>
    '''
    t = Template(html_string)
    c = Context({'person': person})
    page = t.render(c)
    return HttpResponse(page)
```
3.在hellowrold下的setting下进行app的注册

```
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'helloapp' //注册app
]
```

4.最后在helloworld下面的urls中进行路由配置

```
from django.conf.urls import url
from django.contrib import admin
from helloapp.views import helloworld //引入文件

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^page/', helloworld), //分配路由
]
```
然后在浏览器中输入localhost:8000/page中就可以看到效果了。

### 总结
根据流程，整个项目过程如下

python3 -m pip install django //安装django

django-admin helloworld //创建一个django项目

python3 manage.py migrate //创建一个‘数据库’

python3 manage.py runserver //启动项目

python3 manage.py startapp helloapp //项目下创建一个app

helloapp/models.py进行数据的定义后

python3 manage.py makemigrations //初始化数据库

python3 manage.py migrate //更新合并整个项目的数据库

在helloapp/views.py进行视图的操作

在helloworld/setting.py下注册app

在helloworld/urls.py下分配路由

整个基本过程大致上就是这样，后续将进行一个完整web项目的开发过程。





















