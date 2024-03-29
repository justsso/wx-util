// 客服管理
const axios = require('axios');

let getkflist_url = 'https://api.weixin.qq.com/cgi-bin/customservice/getkflist?access_token='; // 客服列表
let addkf_url = 'https://api.weixin.qq.com/customservice/kfaccount/add?access_token=';
let updatekf_url = 'https://api.weixin.qq.com/customservice/kfaccount/update?access_token=';
let delkf_url = 'https://api.weixin.qq.com/customservice/kfaccount/del?access_token=';
let sendmsg_url = 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=';

let uploadImg_url = 'http://api.weixin.qq.com/customservice/kfaccount/uploadheadimg?access_token=';

let zhuangtai_url = 'https://api.weixin.qq.com/cgi-bin/message/custom/typing?access_token=';

class customserviceController {
    // 获取客服列表
    static async getkflist(access_token) {
        let res = await axios.get(getkflist_url + access_token);
        return res.data;
    }

    /** 添加客服
     *
     * @param access_token
     * @param kfData  {
                         "kf_account" : "test1@test",
                         "nickname" : "客服1",
                         "password" : "pswmd5",
                       }
     * @returns {Promise<*>}
     */
    static async addkf(access_token, kfData) {
        let res = await awaitaxios.post(addkf_url + access_token, {
            ...kfData
        });
        return res.data;
    }
    //修改客服账号

    static async updatekf(access_token, kfData) {
        let res = await axios.post(updatekf_url + access_token, {
            ...kfData
        });
        return res.data;
    }

    // 删除客服账号
    static async delkf(access_token, kfData) {
        let res = await axios.post(delkf_url + access_token, {
            ...kfData
        });
        return res.data
    }


    /**
     * 发送客服消息
     * @param access_token
     * @param openid
     * @param obj{type,content,media_id,description}
     * @returns {Promise<string>}
     */
    static async sendKfMessage(access_token, openid, obj) {
        try {
            let sendObj;
            switch (obj.type) {
                case "text":
                    sendObj = {
                        "msgtype": obj.type,
                        "text": {
                            "content": obj.content
                        }
                    };
                    break;
                case "image":
                    sendObj = {
                        "msgtype": obj.type,
                        "image":
                            {
                                "media_id": obj.media_id
                            }
                    };
                    break;
                case "voice":
                    sendObj = {
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
                    sendObj = {
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
                        "news": {
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
                        "wxcard": {
                            "card_id": obj.card_id
                        }
                    };
                    break;
                default:
                    sendObj = {};
            }

            let res = await axios.post(`sendmsg_url${access_token}`, {
                "touser": openid,
                ...sendObj
            });
            return res.data
        } catch (e) {
            throw (e)
        }
    }


    // 设置客服头像
    //
    static async uploadImg(access_token, kf_account, p) {
        let res = await axios.post(uploadImg_url+access_token+ '&kf_account='+kf_account);

        return res.data;

    }

    // 返回客服 输入状态
    static async stateInput(access_token) {
        let res = await axios.post(zhuangtai_url+ access_token);
        return res.data
    }
}
