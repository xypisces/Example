### 新增的html5标签与seo优化

- article,nav,aside,section,header,footer,h1-h6,li,address
- 搜索引擎会过滤掉dispaly:none的内容
- ```<meta keyword>``` 列举出几个重要的关键字
- ```<meta description>``` 网页内容概括
- ```<meta name="viewport" content="width=width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0">```

### 常见布局以及居中

水平居中
- margin + 定宽
- table + margin
- inline-block + text-align
- absolute + margin-left
- absolute + transform (transformX(-50%))
- flex + justify-content

垂直居中
- table-cell + vertical-align
- absolute + transform
- flex + align-items

一列定宽，一列自适应
- float + margin

### flex布局
 
 父元素
 - flex-direction : row | column | row-reverse | column-reverse
 - flex-wrap: nowrap | wrap | wrap-reverse
 - flex-flow: flex-direction && flex-wrap
 - justify-content : flex-start | flex-end | center | space-between | space-around
 - align-items: flex-start | flex-end | center | baseline | stretch;
 - align-content: flex-start | flex-end | center | space-between | space-around | stretch

 子元素
 - order: 1 排列顺序
 - flex: flex-grow && flex-shrink && flex-basic
 - align-self: auto | flex-start | flex-end | center | baseline | stretch

 ### html5/css3

 - 新的表单控件，比如 calendar、date、time、email、url、search，移动端体验更好
 - 对本地离线存储的更好的支持 Local storge，sessionStorage
 - 用于绘画的 canvas 元素
 - 新的结构元素，比如 article、footer、header、nav、section，更加语义化
 - 新增获取地理位置，上传文件等API

 - transition： CSS属性，花费时间，效果曲线(默认ease)，延迟时间(默认0)
 - animation：动画名称，一个周期花费时间，运动曲线（默认ease），动画延迟（默认0），播放次数（默认1），是否反向播放动画（默认normal），是否暂停动画（默认running
 - @keyframes 动画名称 {...}
 - box-shadow: 水平阴影的位置 垂直阴影的位置 模糊距离 阴影的大小 阴影的颜色 阴影开始方向（默认是从里往外，设置inset就是从外往里）;
 - border-image: 图片url 图像边界向内偏移 图像边界的宽度(默认为边框的宽度) 用于指定在边框外部绘制偏移的量（默认0） 铺满方式--重复（repeat）、拉伸（stretch）或铺满（round）（默认：拉伸（stretch））;
 - text-shadow:水平阴影，垂直阴影，模糊的距离，以及阴影的颜色。
 - 省略号
 ```css
 div
{
    width:200px; 
    border:1px solid #000000;
    overflow:hidden;
    white-space:nowrap; 
    text-overflow:ellipsis;
}
div //多行
{
    width:400px;
    margin:0 auto;
    overflow : hidden;
    border:1px solid #ccc;
    text-overflow: ellipsis;
    padding:0 10px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height:30px;
    height:60px;
}
```
- box-sizing:border-box(ie盒模型)的时候，边框和padding包含在元素的宽高之内！
- 媒体查询
```css
@media screen and (max-width: 960px) {
    body {
        background-color: darkgoldenrod;
    }
}
@media screen and (max-width: 480px) {
    body {
        background-color: lightgreen;
    }
}
```