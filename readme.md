>说明：微信开发中用到的方法整理

微信公众号开发，接口以/wx开始，接受到微信服务器发来的xml数据，先解析成json  

已实现的功能：
回复单条消息[一次只能发一条]  `replyMessage`

获取关注着信息 `getOneUserInfoFromWx`

创建临时二维码 `createArgumentQrCode`

添加客服账号  `addKfAccount`

发送客服消息[可以连续发送多条消息] `sendKfMessage`

创建菜单 `createMenu`

创建临时素材 `createTempMedia`

获取临时素材 `getMaterialList`

创建永久素材 `uploadMaterial`

下载网络图片 `downloadImg`

发送模版消息 `sendTempMesg`

公众号授权登陆   `/api/login`

微信网页开发js-sdk  `/api/wx_config`



