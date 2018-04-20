## Angular

- 路由和导航
- 依赖注入，提供器，注入器
- 数据绑定，响应式编程，管道
- 组件间通讯（中间人模式，生命周期，输入输出属性）
- 表单处理（模板式，响应式，表单校验）
- 与服务端通讯
- 构建和部署

```js
<h2>{{hero.name | uppercase }} Detail</h2> // { | }就是管道的用法
<input [(ngModel)]="hero.name" placeholder="name"> // 数据双向榜单
// 循环和点击事件
<li *ngFor="let hero of heroes" (click)="onSelect(hero)">
    <span class="badge">{{hero.id}}</span> {{hero.name}}
  </li>
  // if判断
  <div *ngIf="selectedHero"></div>
  // 样式选择
  [class.selected]="hero === selectedHero"
```

### 生命周期
- ngOnChanges 输入输出的值发生改变
- ngOnInit 第一次OnChangee时候调用
- ngDoCheck 自定义方法的改变
- ngAfterContentInit 组件内容初始化后调用
- ngAfterContentChecked 每次检查内容时调用
- ngAfterViewInit 视图初始化
- ngAfterViewChecked 每次检查视图时调用
- ngOnDestroy 销毁前