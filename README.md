*这个项目是我在学习`react-native`的过程中写的*

现在还有很多功能,细节方面都没有写

android 文章页面 左右滑动切换文章功能暂时还没有实现, 手势会和 webView有 冲突
缓存页面等
    

### 使用的组件

**react-native-router-flux** 导航路由组件

**react-native-spinkit** loading组件, 需要 android sdk 25以上

**react-native-splash-screen** 启动屏,  只用到安卓部分 ,ios 用xcode设置就好, 

这个在ios, 会有找不到包的错误, 按照官方解决方法还是不行

**react-native-swiper**  **react-native-snap-carousel**   轮播组件都还不错 
这里用了后者

**react-native-vector-icons** 图标组件库 自带大量图标, 也可以添加自己的

### 总结

react-native 的水还是太深, 看来至少要对原生开发比较熟悉,才好,

1. android 尤其麻烦,各种sdk版本不合适, 打包出错, 甚至 我的电脑上一直都跑不起来
2. **java版本必须要是jdk8**还需要安装`NDK`
3. 官方的组件也不太好用, 下拉刷新,上拉加载 
4. 上拉加载,甚至 触发十几次, 而同样写法的另一个页面却 很正常
5. 在列表滚动时图片会频繁闪烁, 不知是 滚动列表嵌套几层的问题,还是render里 再次封成函数的问题
 
 **一步一个坑**
