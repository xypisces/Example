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

