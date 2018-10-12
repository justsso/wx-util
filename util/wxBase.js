const {parseString} = require('xml2js');
const axios = require('axios');
const exec = require('child_process').exec;
/**
 * 将xml解析为js对象
 * @param xml
 * @returns {Promise<any>}
 */
function parseXML(xml) {
    try {
        return new Promise((resolve, reject) => {
            parseString(xml,  (err, result) => {
                err && reject(err);
                resolve(result);
            })
        })
    }catch (e) {
        throw (e);
    }
}

/**
 * 回复消息，返回xml
 * @param obj
 * @returns {string}
 */
function replyMessage(obj){
    let timestamp = Math.floor(new Date().getTime()/1000);
    switch (obj.type) {
        case "text": {
            let textContent = obj.content;
            return `<xml> 
                <ToUserName><![CDATA[${obj.toUser}]]></ToUserName>
                <FromUserName><![CDATA[${obj.fromUser}]]></FromUserName> 
                <CreateTime>${timestamp}</CreateTime> 
                <MsgType><![CDATA[text]]></MsgType> 
                <Content><![CDATA[${textContent}]]></Content> 
                </xml>`;
            break;
        }
        case "image": {
            let media_id = obj.media_id;
            return `<xml>
                <ToUserName><![CDATA[${obj.toUser}]]></ToUserName>
                <FromUserName><![CDATA[${obj.fromUser}]]></FromUserName> 
                <CreateTime>${timestamp}</CreateTime>
                <MsgType>< ![CDATA[image] ]></MsgType>
                <Image>
                <MediaId>< ![CDATA[${media_id}] ]></MediaId>
                </Image>
                </xml>`;
            break;
        }
        case "voice": {
            let media_id = obj.media_id;
            return `<xml>
            <ToUserName><![CDATA[${obj.toUser}]]></ToUserName>
            <FromUserName><![CDATA[${obj.fromUser}]]></FromUserName> 
            <CreateTime>${timestamp}</CreateTime>
            <MsgType>< ![CDATA[voice] ]></MsgType>
            <Voice>
            <MediaId>< ![CDATA[${media_id}] ]></MediaId>
            </Voice>
            </xml>`;
            break;
        }
        case "video": {
            let media_id = obj.media_id;
            let title = obj.title;
            let description = obj.description;
            return `<xml>
            <ToUserName><![CDATA[${obj.toUser}]]></ToUserName>
            <FromUserName><![CDATA[${obj.fromUser}]]></FromUserName> 
            <CreateTime>${timestamp}</CreateTime>
            <MsgType>< ![CDATA[video] ]></MsgType>
            <Video>
            <MediaId>< ![CDATA[${media_id}] ]></MediaId>
            ${title ? `<Title>![CDATA[${title}]]</Title>` : ''} 
            ${description ? `<Description>< ![CDATA[${description}] ]></Description>` : ''}  
            </Video> 
            </xml>`;
            break;
        }
        case "music":{
            let title = obj.title;
            let description = obj.description;
            let music_url = obj.music_url;
            let HQMusicUrl  = obj.HQMusicUrl;
            let ThumbMediaId = obj.ThumbMediaId;
            return `<xml>
            <ToUserName><![CDATA[${obj.toUser}]]></ToUserName>
            <FromUserName><![CDATA[${obj.fromUser}]]></FromUserName>
            <CreateTime>${timestamp}</CreateTime>
            <MsgType>< ![CDATA[music] ]></MsgType>
            <Music>
            ${title ? `<Title>![CDATA[${title}]]</Title>`: ''}
            ${description ? `<Description>< ![CDATA[${description}] ]></Description>`: ''}
            ${music_url ? `<MusicUrl>< ![CDATA[${music_url}] ]></MusicUrl>`: ''}
            ${HQMusicUrl ? `<HQMusicUrl>< ![CDATA[${HQMusicUrl}] ]></HQMusicUrl>`: ''}
            ${ThumbMediaId ? `<ThumbMediaId>< ![CDATA[${ThumbMediaId}] ]></ThumbMediaId>`: ''}
            </Music>
            </xml>`;
            break;
        }
        case "news": {
            let title = obj.title;
            let description = obj.description;
            let picurl = obj.picurl;
            let url = obj.url;
            return `<xml>
            <ToUserName><![CDATA[${obj.toUser}]]></ToUserName>
            <FromUserName><![CDATA[${obj.fromUser}]]></FromUserName>
            <CreateTime>${timestamp}</CreateTime>
            <MsgType>< ![CDATA[news] ]></MsgType>
            <ArticleCount>1</ArticleCount>
            <Articles>
            <item>
            <Title>< ![CDATA[${title}] ]></Title> 
            <Description>< ![CDATA[${description}] ]></Description>
            <PicUrl>< ![CDATA[${picurl}] ]></PicUrl>
            <Url>< ![CDATA[${url}] ]></Url>
            </item>
            </Articles>
            </xml>`;
            break;
        }
        default:
            return 'success';
    }
}

/**
 * 获取关注者信息
 * @param openid
 * @returns {Promise<*>}
 */
async function getOneUserInfoFromWx(access_token,openid) {
    try {
            //网络获取
            var url = `https://api.weixin.qq.com/cgi-bin/user/info?access_token=${access_token}`;
            var res = await axios.get(`${url}&openid=${openid}&lang=zh_CN`);
            return res.data;
    }catch (e) {
        throw (e)
    }
}


/**
 * 创建临时二维码[带场景值的二维码]
 * @param access_token
 * @param openid
 * @returns {Promise<string>}
 */

//这里信息不全，临时二维码还有时间的属性
async function createArgumentQrCode(access_token,openid) {
    try {
        var res = await axios.post(`https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=${access_token}`, {
            "action_name": "QR_LIMIT_STR_SCENE",
            "action_info": {
                "scene": {
                    "scene_str": openid
                }
            }
        });
        if (res.data) {
            let {ticket} = res.data;
            if(ticket){
                let url = `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ ticket}`;
                console.log(url ,'获取 临时二维码..');
                return url;
            }else {
                let url = `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ ticket}`;
                return url;
            }
        }
    }catch (e) {
        throw (e);
    }
}

/**
 * 添加客服账号
 * @param access_token
 * @param kf_account
 * @param nickname
 * @param password
 * @returns {Promise<*>}
 */
async function addKfAccount(access_token,{kf_account,nickname,password}) {
    try {
        var url = 'https://api.weixin.qq.com/customservice/kfaccount/add?access_token=';
        var res = await axios.post(`${url}${access_token}`,{
            "kf_account" : kf_account,
            "nickname" : nickname,
            "password" : password,
        });
        if(res.data.errcode === 0){
            console.log('开通成功!');
            return 'ok';
        }
    }catch (e) {
        throw (e);
    }
}


/**
 * 发送客服消息
 * @param access_token
 * @param openid
 * @param obj
 * @returns {Promise<string>}
 */
async function sendKfMessage(access_token, openid, obj) {
    try {
        let sendObj;
        switch (obj.type) {
            case "text":
                sendObj= {
                    "msgtype": obj.type,
                    "text": {
                        "content": obj.content
                    }
                };
                break;
            case "image":
                sendObj= {
                    "msgtype": obj.type,
                    "image":
                        {
                            "media_id": obj.media_id
                        }
                };
                break;
            case "voice":
                sendObj= {
                    "msgtype": obj.type,
                    "video":
                        {
                            "media_id": obj.media_id,
                            "thumb_media_id": obj.media_id,
                            "title": obj.title,
                            "description": obj.description
                        }
                };
                break;
            case "music":
                sendObj= {
                    "msgtype": obj.type,
                    "music":
                        {
                            "title": obj.title,
                            "description": obj.description,
                            "musicurl": obj.url,
                            "hqmusicurl": obj.hqmusicurl,
                            "thumb_media_id": obj.thumb_media_id
                        }
                };
                break;
            case "news":
                // 跳转到外链
                sendObj = {
                    "msgtype": obj.type,
                    "news":{
                        "articles": [
                            {
                                "title": obj.title,
                                "description": obj.description,
                                "url": obj.url,
                                "picurl": obj.picurl
                            }
                        ]
                    }
                };
                break;
            case "mpnews":
                // 跳转到图文消息页面
                sendObj = {
                    "msgtype": obj.type,
                    "mpnews":
                        {
                            "media_id": obj.media_id
                        }
                };
                break;
            case "wxcard":
                sendObj = {
                    "msgtype": obj.type,
                    "wxcard":{
                        "card_id": obj.card_id
                    }
                };
                break;
            default:
                sendObj = {};
        }

        let res = await axios.post(`https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=${access_token}`, {
            "touser": openid,
            ... sendObj
        });
        if(res.data.errcode === 0){
            return 'send ok';
        }else {
            return 'send error';
        }
    }catch (e) {
        throw (e)
    }

}


/**
 * 创建菜单
 * @param access_token
 * @param menuObj
 * @returns {Promise<*>}
 */
async function createMenu(access_token, menuObj){
//    https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141013
    var url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${access_token}`;
    var res = await axios.post(url, menuObj);
    if(res.data.errcode === 0){
        return 'create ok';
    }else {
        return res.data;
    }
}


/**
 * 创建临时素材
 * @param access_token
 * @param filePath
 * @param mediaType
 * @returns {Promise<*|void>}
 */
async function createTempMedia(access_token,filePath, mediaType) {
    try {
        return new Promise((resolve, reject) => {
            exec(`curl -F media=@${filePath} "https://api.weixin.qq.com/cgi-bin/media/upload?access_token=${access_token}&type=${mediaType}"`, (er, result) => {
                er && reject(er);
                if(result.media_id){
                    resolve(result)
                }else {
                    reject(null);
                }
            });
        })
    } catch (e) {
        throw (e);
    }
}

/**
 * 获取素材列表
 * @param access_token
 * @param type
 * @param offset
 * @param count， 取值在1到20之间
 * @returns {Promise<*>}
 */
async function getMaterialList( access_token, {type, offset, count}) {
    try{
        let url = `https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=${access_token}`;
        let a = await axios.post(url, {
            "type": type,
            "offset": offset,
            "count": count
        });
        return a.data;
    }catch (e) {
        throw (e);
    }
}

/**
 * 下载网络图片
 * @param url
 * @param downloadPath
 * @returns {Promise<any>}
 */
var downloadImg = function (url, downloadPath) {
    try {
        return new Promise((resolve, reject) => {
            let stream = request(url).pipe(fs.createWriteStream(downloadPath));
            stream.on('finish', function () {
                resolve('download ok');
            });
            stream.on('error', function (err) {
                reject(err);
            })
        })
    }catch (e) {
        throw (e);
    }
};

/**
 *
 * @param access_token
 * @param postData
 * @returns {Promise<*>}
 */
var sendTempMesg = async function(access_token, postData){
  try {

      let back =  axios.post(`https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}`, postData)
      return back.data;
  } catch (e) {
      throw (e);
  }
};


module.exports = {
    parseXML,
    replyMessage,
    getOneUserInfoFromWx,
    createArgumentQrCode,
    addKfAccount,
    sendKfMessage,
    createMenu,
    createTempMedia,
    getMaterialList,
    downloadImg,
    sendTempMesg
};

