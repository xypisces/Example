## Linux 下安装mongodb

- wget http://fastdl.mongodb.org/linux/mongodb-linux-x86_64-2.2.3.tgz // 下载安装包
- tar zxvf mongodb-linux-x86_64-2.2.3.tgz 解压
- mv mongodb-linux-x86_64-2.2.3 /usr/local/mongodb 移动
- mkdir -p /data/db  自定义目录
- sudo mongod --dbpath /data/mongo/ --logpath /data/mongo/mongo.log --logappend --fork --port 27017  //后台启动
- mongo //看效果
- ps aux |grep mongodb // 查看进程
- echo "/usr/local/mongodb/bin/mongod --dbpath=/usr/local/mongodb/data/db --logpath=/usr/local/mongodb/logs/mongodb.log --fork" >> /etc/rc.local // 开机自启动

## 使用mongodb
mongod  //连接

mongo // 启动

show dbs

use nodeapi

show collections

db.bears.find()／／ 查询所有

db.bears.insert({"name":"xuyu"})  // 插入

db.bears.find({ field1: value1, field2: value2, ... }) ／／ 查询

db.restaurants.find().sort( { "borough": 1, "address.zipcode": 1 } ) ／／1代表升序，-1代表降序

db.bears.update({"name":"mongo"},{$set:{"time":"now"}}，{ multi: true}) ／／修改name为mongo的文档 multi表示更新多个文档，不加默认为一个

db.restaurants.remove( { "borough": "Manhattan" } ) ／／删除操作

db.restaurants.remove( { } ) ／／删除所有文档

db.restaurants.drop()／／删除一个集合

