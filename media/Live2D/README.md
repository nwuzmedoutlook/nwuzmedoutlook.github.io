# Live2D-for-Gridea
 为Gridea主题添加Live2D看板娘

## 概要
看到别人的网站有看板娘，但是Gridea并没有特别完整的解决方案，便在Github上寻找相关的代码，看到项目：[live2d-widget](https://github.com/stevenjoezhang/live2d-widget)，便稍作修改，就实现将看板娘本地化到主题中，需要改动的地方很少。
效果预览：[wherelse.cc](https://wherelse.cc)
## 操作方法
1) 从我的github上下载或clone repo，地址：[Live2D For Gridea](https://github.com/wherelse/Live2D-for-Gridea)
2. 将文件以文件夹形式放入到`\主题\assets\media`下
![](/img/1583685033340.png)
文件夹的内容应有一下几项：
![](/img/1583685129035.png)
3. 将下面的代码加入 `index.ejs`的`<head> `或 `<body>`之间保存。
```html
<script src="./media/live2d/autoload.js"></script>
```
4. 在Gridea中预览添加完成后的效果。
![](/img/1583685534617.png)
   
## 在主题中添加开启按钮（可选）
在config.json最后添加：
```json
{
    "name": "Live2D",
    "label": "Live2D看板娘",
    "group": "Live2D",
    "value": true,
    "type": "switch",
    "note": "若不需要，可关闭以加快页面加载速度"
}
```
`<head> `或 `<body>`间的代码更改为：

```html
<% if (site.customConfig.Live2D){ %>
    <script src="./media/live2d/autoload.js"></script>
<% } %>
```

## Live2D自定义
在`waifu-tips.json`和`waifu-tips.js`中可以自定义看板娘的文字内容，按需更改。