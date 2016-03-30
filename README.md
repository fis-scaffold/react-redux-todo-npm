# FIS3 React + Redux 的 todo demo.

## 安装 fis3

`npm install fis3 -g`

**注意 fis3 版本请用 3.2.9 或者以上，否则需要把 .ts 文件后缀假如文本类型列表中**

## 初始化

```bash
mkdir demo
cd demo
fis3 init react-redux-todo-npm
```

## 运行 & 预览

```bash
fis3 release
fis3 server start
```

或者

```
npm start
```

## 产出产品代码

只启用了 js 压缩和 合并。

```
fis3 release production -d ./output
```
或者

```
npm run release
```
