>公众号开发中从业务中抽离出来公用的一些方法，继承在该项目。主要实现代码在/app/controller中，如若使用，直接copy.

**支持设置一个或者多个公众号**

### 使用方法
1. 在/config/config.default.js文件中，添加配置，可以参考`ceshi`这个写
2. 在`app.js` 文件中，所有配置的微信公众号的access_token相关信息，存储在全局的global对象下的accessTokens属性中

**注意⚠️**：在配置公众号时，自定义的名字不可混淆。

[接口测试号申请地址](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login)，尽量不要拿公司的账号做测试用，先用自己的微信号申请一个测试公众号


### 代码概述：
`/app/routers`文件夹下有三个路由文件： `api.js`,`set.js`,`wx.js`，他们的作用分别是：
- api.js : 提供微信相关的逻辑接口，比如： 微信授权
- set.js : 主要为使用者提供快速的测试接口
- wx.js : 主要接受微信服务器的请求，用户给公众号的活动先经过微信服务器，然后再转发到我们的服务器上

不了解微信开发的，先看看[入门指引](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1472017492_58YV5)

微信公众号开发，接口以/wx开始，接受到微信服务器发来的xml数据，先解析成json  

### 实现的功能：

- `/app/controller/menuController`
 1. 创建菜单 `createMenu`，`menuData`中的菜单类型查看[微信公众平台官网](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141013)
 2. 查询菜单 `getMenu`
 3. 删除菜单 `deleteMenu`
 4. 获取菜单配置 `getSelfMenu`
 5. 设置个性化菜单 `createConditionalMenu`
 6. 删除个性化菜单 `delConditional`
 7. 测试个性化菜单中某用户的匹配结果 `tryMatch`

- `/app/controller/customserviceController`
 1. 添加客服 `addkf`
 2. 修改客服 `updatekf`
 3. 删除客服 `delkf`
 4. 发送消息 `sendKfMessage`
 5. 返回客服输入状态 `stateInput`
 6. 获取客服列表 `getkflist`
 7. 设置客服头像 `uploadImg`
 
- `/app/controller/tempMediaController`
 1. 新增素材


客服消息与xml消息的区别是，客服消息一次可以回复多条，xml一次只能回复一条


回复单条消息[一次只能发一条]，使用xml数据发送  `replyMessage`

获取关注者信息 `getOneUserInfoFromWx`

创建临时二维码 `createArgumentQrCode`

添加客服账号  `addKfAccount`

发送客服消息[可以连续发送多条消息]，使用客服接口发送 `sendKfMessage`


创建临时素材 `createTempMedia`

获取临时素材 `getMaterialList`

创建永久素材 `uploadMaterial`

下载网络图片 `downloadImg`

发送模版消息 `sendTempMesg`

公众号授权登陆   `/api/login`

微信网页开发js-sdk  `/api/wx_config`



