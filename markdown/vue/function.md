## 获取多个目录
### this.$GetIndexCatalogue(Number)
- 接受一个Number类型的参数，Number的值为请求的目录个数
- 返回相同数量的对象值，需先在页面初始化，格式为：catalogueData_{index}

示例：
```js
// xx.vue
export default {
  data(){
    return{
      catalogueData_0: {},
      catalogueData_1: {},
      catalogueData_2: {},
      catalogueData_3: {},
      catalogueData_4: {},
    }
  },
  created(){
    this.$GetIndexCatalogue(5)
  },
}
```

函数返回的是一个promise函数，后续可以加then操作，当所有请求结束后执行then的操作，如```this.$GetIndexCatalogue(5).then(()=>console.log('xxx'))```

## 获取菜单栏数据
## this.$GetMenuData(payload[object])
默认参数为defaultPayload = {locationId:1}
- 接受一个对象作为请求的额外参数
- 返回值固定为```menuData```,通过```this.$store.state```获取
```js
this.$GetMenuData().then(() => {
    const { items=[] } = this.$store.state.menuData
    this.menuData = items
})
```
## 获取单个目录数据
## this.$GetCatalogueData
默认参数为defaultPayload = {locationId:1}
- 接受一个对象作为请求的额外参数
- 返回值固定为```catalogueData```,通过```this.$store.state```获取
```js
this.$GetCatalogueData({ catalogueId: this.$route.query.catalogueId, pageNum: pageNum, pageSize: this.pageSize})
    .then(() => {
      this.page = pageNum;
      this.catalogueData = this.$store.state.catalogueData;
      this.pageTotal = this.catalogueData.articles.total%this.pageSize === 0
      ?this.catalogueData.articles.total/this.pageSize 
      :Math.floor(this.catalogueData.articles.total/this.pageSize) + 1;
      this.articleList = this.$store.state.catalogueData.articles.list;
    })
```
## 获取轮播图数据
## this.$GetSlideData
默认参数为defaultPayload = {locationId:1}
- 接受一个对象作为请求的额外参数
- 返回值固定为```slideData```,通过```this.$store.state```获取
```js
this.$GetSlideData().then(() => {
    const { pictures=[] } = this.$store.state.slideData
    this.slideData = pictures;
})
```
## 获取搜索结果数据
## this.$GetSearchData
默认参数为defaultPayload = {locationId:1}
- 接受一个对象作为请求的额外参数
- 返回值固定为```searchData```,通过```this.$store.state```获取
```js
const param = {
  type: 'keyword',
  data: this.$route.query.value || this.$store.state.keyword,
}
this.$store.commit('SAVE', param);
this.$GetSearchData({ keyword: this.$store.state.keyword, pageNum: 1, pageSize: this.pageSize })
.then(() => {
  this.result=this.$store.state.searchData
  this.searchList = this.$store.state.searchData.list
})
```
## 获取文章详情数据
## this.$GetArticleData
默认参数为defaultPayload = {locationId:1}
- 接受一个对象作为请求的额外参数
- 返回值固定为```articleData```,通过```this.$store.state```获取
```js
this.$GetArticleData({ articleId: this.$route.query.articleId}).then(() => {
    this.articleContent = this.$store.state.articleData;
});
```
## 获取上下篇数据
## this.$GetPreAndNext
默认参数为defaultPayload = {locationId:1}
- 接受一个对象作为请求的额外参数
- 返回值固定为```preAndNext```,通过```this.$store.state```获取
```js
this.$GetPreAndNext({articleId: this.$route.query.articleId}).then(() => {
  this.preAndNext = this.$store.state.preAndNext;
})
```
## 获取底部友情链接数据
## this.$GetMenuFootData
默认参数为defaultPayload = {locationId:1}
- 接受一个对象作为请求的额外参数
- 返回值固定为```menuFootData```,通过```this.$store.state```获取
```js
const payload = { locationId: 2,}
this.$GetMenuFootData(payload).then(() => {
    const { items=[] } = this.$store.state.menuFootData
    this.menuFootData = items
})
```
## 获取列表侧边栏数据
## this.$GetMenuItemsData
默认参数为defaultPayload = {locationId:1}
- 接受一个对象作为请求的额外参数
- 返回两个值 
  - 数据值固定为```menuItemsData```,通过```this.$store.state```获取
  - 请求目录id存储固定为```ActiveMenuItem```,通过```this.$store.state```获取,用于标识当前请求的目录
```js
this.$GetMenuItemsData({catalogueId: this.$route.query.catalogueId,}).then(()=>{
  this.menuItem = this.$store.state.menuItemsData;
  this.ActiveItem = this.$store.state.ActiveMenuItem;
})
```

## 获取多语言列表
## this.$GetLanguagesData

> 同上

```js
this.$GetLanguagesData().then(()=>{
    this.languagesData = this.$store.state.languagesData
  })
```

## 切换多语言按钮
## this.$ChangeLanguage(id)
> 传入对应的语言id即可

```js
// template
  <li 
  v-if='languagesData.list'
  v-for='(item,idx) in languagesData.list'
  :key="idx"
  @click.prevent="changeLanguage(item.languageId)">
  <a href="#">{{item.name}}</a></li>
//js
methods: {
  changeLanguage(id){
    this.$ChangeLanguage(id)
  }
}
```

## 通用方法
## this.$GetInitData(key[string],value[string],payload[object])
- key值为请求的数据字段，详见公用方法
- value值为生成的数据字段, store中的存储值
- payload为请求需要的额外参数

示例：
```js
// xx.vue
export default {
  data(){
    return{
      menuData: {},
    }
  },
  created(){
    this.$GetInitData('menu','menuData',{menuId:'xxx}).then(()=>{
      this.menuData = this.$store.state.menuData
    })
  },
}
```

## key值
- key值即为请求的url地址

```js
const Url = {
  menu: 'page/data/menu', //菜单
  media: 'page/data/multimedia', //多媒体
  slide: 'page/data/slide', //轮播图
  article: 'page/data/article',//文章详情
  catalogue: 'page/data/catalogue', //目录接口
  search: '/page/data/search/articles', //搜索接口
  preAndNext: '/page/data/article/preAndNext', //上下篇接口
  childCat: '/page/data/catalogues', //目录
  menuItems: '/page/data/menuItems' //侧边栏接口
}
```