const axios = require('axios');

let getMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/get?access_token=';
let createMenuUrl = ' https://api.weixin.qq.com/cgi-bin/menu/create?access_token=';
let deleteMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=';
let selfMenuUrlInfo = 'https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info?access_token=';
let addConditionalMenu = 'https://api.weixin.qq.com/cgi-bin/menu/addconditional?access_token=';
let tryMatchUrl = 'https://api.weixin.qq.com/cgi-bin/menu/trymatch?access_token=';
let delConditionalUrl = 'https://api.weixin.qq.com/cgi-bin/menu/delconditional?access_token=';

class menuController {
    //自定义菜单查询，通常用这个
    /**
     *
     * @param access_token
     * @returns {Promise<*>}
     */
    static async getMenu(access_token) {
        let res = await axios.get(getMenuUrl + access_token);
        return res.data;
    }

    //创建菜单，菜单的类型查看 https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141013
    /**
     *
     * @param access_token
     * @param menuData Object
     * @returns {Promise<*>}
     */
    static async createMenu(access_token, menuData) {
        let res = await axios.post(createMenuUrl + access_token, menuData);
        return res.data
    }
    //删除所有菜单
    static async deleteMenu(access_token) {
        let res = await axios.get(deleteMenuUrl + access_token);
        return res.data;
    }

    //获取菜单配置
    static async getSelfMenu(access_token) {
        let res = await axios.get(selfMenuUrlInfo + access_token);
        return res.data;
    }

    //个性化菜单，不同用户看到不同的菜单
    //比如根据性别能看到
    static async  createConditionalMenu(access_token, menuData){
        let res = await axios.post(addConditionalMenu + access_token, menuData);
        return res.data
    }

    //自定义菜单推送，与微信服务器发来的xml数据有关系

    static async tryMatch(access_token, openid){
        let res = await axios.post(tryMatchUrl + access_token, {"user_id": openid});
        return res.data
    }
    //删除个性化菜单
    static async delConditional(access_token, menuid){
        let res = await axios.post(delConditionalUrl, {"menuid": menuid});
        return res.data
    }
}

module.exports = menuController;
