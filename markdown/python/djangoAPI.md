## django API

django rest framework

```
//api.py
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.decorators import api_vie

```

### 序列化数据

```
class videoSerializer(serializers.ModelSerializer):
	class Meta:
		model = Video
		fields = '__all__'
```

### 构建视图

```
@api_view(['GET']) //装饰器，返回json格式数据
def view(request):
	list = video.objects.all()
	serializer = videoSerializer(list, many=true)
	return Response(serializer.data) //半成品
```

### 分配网址

```
url(r'^api/view/',view)
```

## RESTFUL API 

restful api

- 网址对应资源  x.com/video/1
- 方法对应动作  post x.com/video
- 返回相应码  code:200

```
from rest_framework import status
@api_view(['GET','POST']) //装饰器，返回json格式数据
def view(request):
	if request.method = 'GET':
		list = video.objects.all()
		serializer = videoSerializer(list, many=true)
		return Response(serializer.data) //半成品
	elif request.method = 'POST':
		serializer = videoSerializer(data = request.data)
		if serializer.is_vaild():
			serializer.save()
			return Response(serializer.data, status = status.HTTP_201_CREATED)
		body = {
			'bode': serializer.errors,
			'message': '4001'
		}
		return Response(body, status = status.HTTP_400_BAD_REQUEST)
```

## API 权限控制

```

```






