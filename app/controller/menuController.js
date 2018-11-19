const axios = require('axios');

let getMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/get?access_token=';
let createMenuUrl = ' https://api.weixin.qq.com/cgi-bin/menu/create?access_token=';
let deleteMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=';
let selfMenuUrlInfo = 'https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info?access_token=';


class menuController {
    //自定义菜单查询
    static async getMenu(access_token){
        let res = await axios.get(getMenuUrl + access_token);
        return res.data;
    }

    static async createMenu(access_token){
        let res = await axios.post(createMenuUrl+ access_token, menuData);
        return res.data
    }

    static async deleteMenu(access_token){
        let res = await axios.get(deleteMenuUrl+ access_token);
        return res.data;
    }

    //菜单配置
    static async getSelfMenu(access_token){
        let res = await axios.get(selfMenuUrlInfo + access_token);
        return res.data;
    }
    //个性化菜单，不同用户看到不同的菜单
}
module.exports = menuController;
