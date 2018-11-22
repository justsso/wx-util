const {parseString} = require('xml2js');

// 解析上下文里 node 原生请求的 POST 参数
function parsePostData(ctx) {
    return new Promise((resovle, reject) => {
        try {
            let postData = "";
            //  ctx.req 是原生 HTTP 请求对象
            ctx.req.on("data", (data) => {
                postData += data;
            });
            ctx.req.on("end", () => {
                resovle(postData);
            })
        } catch (err) {
            reject(err);
        }
    });
}

function parseXML(xml) {
    try {
        return new Promise((resolve, reject) => {
            parseString(xml, (err, result) => {
                err && reject(err);
                resolve(result);
            })
        })
    } catch (e) {
        throw (e);
    }
}

function getAccessToken(name) {
    for (let i = 0; i < global.accessTokens.length; i++) {
        let item = global.accessTokens[i];
        if (item.name === name) {
            return item.accessToken;
        }
    }
}

module.exports.parsePostData = parsePostData;
module.exports.parseXML = parseXML;
module.exports.getAccessToken = getAccessToken;
