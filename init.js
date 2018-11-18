//需要在相应的公众号中配置ip白名单
let axios = require('axios');
let config = require('./config/config.default');
let arr = config.arr;
let wxConfig = config.wxConfig;
let endAckArr =[];
async function getAccessToken() {
    for (let i = 0; i < arr.length; i++) {
         let appId = wxConfig[arr[i]].appId;
         let appSecret = wxConfig[arr[i]].appSecret;
         let tokenObj = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`);

         //添加jsSdk功能
         endAckArr.push({
             wxId: wxConfig[arr[i]].wxId,
             accessToken: tokenObj.data.access_token,
             name: arr[i]
         })
    }
    return endAckArr;
}

module.exports.getAccessToken = getAccessToken;
