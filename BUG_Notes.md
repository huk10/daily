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
