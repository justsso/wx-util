//临时素材 保存在微信后台3天
const axios = require('axios');
let upload_url = 'https://api.weixin.qq.com/cgi-bin/media/upload?access_token=';

class tempMediaController {
    /**
     * 创建临时素材
     * @param access_token
     * @param filePath
     * @param mediaType
     * @returns {Promise<*|void>}
     */
    static async createTempMedia(access_token, filePath, mediaType) {
        try {
            return new Promise((resolve, reject) => {
                exec(`curl -F media=@${filePath} "https://api.weixin.qq.com/cgi-bin/media/upload?access_token=${access_token}&type=${mediaType}"`, (er, result) => {
                    er && reject(er);
                    if (result.media_id) {
                        resolve(result)
                    } else {
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
    static async getMaterialList(access_token, {type, offset, count}) {
        try {
            let url = `https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=${access_token}`;
            let a = await axios.post(url, {
                "type": type,
                "offset": offset,
                "count": count
            });
            return a.data;
        } catch (e) {
            throw (e);
        }
    }
    static async ger(){

    }

}
