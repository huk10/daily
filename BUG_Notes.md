## React-narive 遇到 的 Bug

### ios webView 内样式, 图片失效

**解决**

1. 先看看是不是 `http` 的资源失效, 如是
2. 用 `xcode` 打开 `info.plist`
3. 找到 `App Transport Security Settings` 下的 `Allow Arbitrary Loads` 
4. 按下 `Tab` 键将 `value` 值改为 `Yes`

**原因**

ios 默认不支持 https, 

### 使用 mobox 报 Can't find the symbol 错误

**解决**

1. 将`mobx` 降级到 4 版本就可
2. 安装 `jsc-Android`包, 升级`Android`的`JavaScriptCore`, 比较麻烦,需要修改 `Android` 目录的文件,还有 sdk 的要求, 我没能成功

**原因**

mobox 5以上版本使用了 react-native 不支持的东西

### 安卓找不到 引入的包错误

**引入第三方需原生代码的包**

1. `settings.gradle` 添加 引入信息
2. `app` 下的`build.gradle` 文件的 `dependencies` 内要添加 类似  `    compile project(':react-native-spinkit')` 的引用
3. 需要在 `MainApplication.java` 内引入 头部的 `import`  `getPackages` 方法的返回列表中添加

#### sdk版本和包要求不同

1. 到这个包下面的 `build.gradle` 改一下版本就可以了

### 列表中图片在滚动时闪烁

**原因不明大概是布局的问题**

### FlatList 的 上拉事件触发多次的问题

**没有直接找到的原因**

只能暂时利用`onMomentumScrollBegin`和`onMomentumScrollEnd`两个事件解决

### 有兼容问题

需使用
```typescript jsx
"react-native": "0.55.4"
"babel-preset-react-native": "2.1.0"
```

### ios 默认不支持 http
 需要 在`xcode` `info.plist`文件中设置 

## 组件

### react-native-router-flux
`react-native` 的路由组件, 支持侧边栏抽屉, 支持iOS和android

### react-native-spinkit
一个`loading` 组件, 支持iOS和android
需要运行 `react-native link react-native-spinkit`
组件需要安卓sdk不低于 25 需要改一下对应 `build.gradle` 里的版本

### react-native-splash-screen
启动屏幕  android使用, ios遇到包找不到的问题解决不了, ios使用 xcode 设置一下就好
需要运行 `react-native link react-native-splash-screen`

### react-native-snap-carousel react-native-swiper
这两个都是 轮播图组件, 可以选用一个 支持iOS和android

### react-native-vector-icons
图标组件, 内置很多图标, 也可以添加自己的字体图标
需要运行 `react-native link react-native-vector-icons`

*在添加自己的图标时*

android 需要将 .ttf 文件添加 到 `app/src/main/assets/fonts`

ios 需要 在xcode info.plist中添加 