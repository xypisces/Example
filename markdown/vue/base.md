## vue.js

[官网地址](https://cn.vuejs.org/v2/guide/index.html)

```js
<template>
  <div>
    <XXComponent 
    :data='list'
    ></XXComponent>
    <h1>{{a}}</h1> //值的渲染
    <ul v-if='list.length>0' // 条件判断
    > 
      <li
      v-for="(item,idx) in list" //循环
      v-bind:key="idx" //循环必须有key值
      v-bind:class="{active: item.name === 'dingding'}" //相关值的绑定
      @click.stop="init(item.age)" //事件触发
      >
      <input v-model="a"/> //值的双向绑定
      <p v-html="item.girlfriend"></p> //原始html
      </li>
    </ul>
  </div>
</template>
<script>
  import XXComponent from './xx.vue'
  export defult {
    props: ['data'] //作为子组件获取父组件的值
    data() {  //自身值的初始化，类似于state
      return {
        a: '',
        list: [{
          name: 'dingding'
          age: '100',
          girlfriend: 'shanye',
        }],
      }
    },
    created() {  //生命周期
      this.init()
    },
    updated() { //生命周期
      ....
    }
    methods: { //自定义方法
      init(payload){
        this.$GetArticleData(payload).then(()=>{
          this.list = this.$store.state.list
        })
      }
    },
    components: {  //组件
      XXComponent,
    },
    watch: {  //监听
      '$route': 'InitArticle'
    },
  }
</script>
```

## vue-router

[官网地址](https://router.vuejs.org/zh/guide/)

```js
export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Index.vue')
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('./views/List.vue')
    },
    {
      path: '/page',
      name: 'page',
      component: () => import('./views/Page.vue')
    },
    {
      path: '/centent',
      name: 'centent',
      component: () => import(/* webpackChunkName: "about" */ './views/Centent.vue')
    },
    {
      path: '/Search',
      name: 'Search',
      component: () => import(/* webpackChunkName: "about" */ './views/Search.vue')
    },
  ]
})
```


```js
// template跳转
<router-link 
  :to="{ name: 'centent', query: { articleId: item.articleId,catalogueId:catalogueData_4.catalogueId }}"
  >
</router-link>
// js跳转
toArticle(id) {
  this.$router.push({ name: 'centent', query: { articleId: id }});
}
```
## vuex

[官网地址](https://vuex.vuejs.org/zh/guide/)

```
this.$store.state
```

## 项目搭建

全局安装vue-cli

```npm install -g @vue/cli```

创建项目

```vue create xxx```

- 把api目录和store目录,src下面四个js文件覆盖过去
- pubulic目录下新建static文件夹，将原有的css/js放进去
- 在static/js/下新建config.js文件，将原有的js拷过去，修改相应的siteid和请求地址
- router.js进行路由的配置
- view文件夹为视图文件
- component文件夹为组件文件