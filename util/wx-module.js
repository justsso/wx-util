const {parseString} = require('xml2js');

//将xml解析为js对象
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


function replyText(xmlobj, content){
    var touser = xmlobj.xml.FromUserName[0];
    var fromuser = xmlobj.xml.ToUserName[0];
    let timestamp = Math.floor(new Date().getTime() / 1000 );
    return `<xml>
            <ToUserName><![CDATA[${touser}]]></ToUserName> 
            <FromUserName><![CDATA[${fromuser}]]></FromUserName> 
            <CreateTime>${timestamp }</CreateTime> 
            <MsgType><![CDATA[text]]></MsgType> 
            <Content><![CDATA[${content}]]></Content> 
            </xml>`;
}

//回复图片消息，返回图像xml
function replyImg(xmlobj, mediaId){
    var touser = xmlobj.xml.FromUserName[0];
    var fromuser = xmlobj.xml.ToUserName[0];
    let timestamp = Math.floor(new Date().getTime() / 1000 );
    return `<xml>
            <ToUserName><![CDATA[${touser}]]></ToUserName>
            <FromUserName><![CDATA[${fromuser}]]></FromUserName>
            <CreateTime>${timestamp}</CreateTime>
            <MsgType><![CDATA[image]]></MsgType>
            <Image>
            <MediaId><![CDATA[${mediaId}]]></MediaId>
            </Image>
            </xml>`;
}

//回复消息，返回xml
/**
 *
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
        case "video":{
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
    }
}


module.exports = {
    parseXML
};
