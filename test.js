var axios = require('axios');
var config = require('./config');
// function User(name){
//     this.name = name || 'dada';
// }
//
// User.prototype.getName = function () {
//     return this.name;
// };


//实例对象
// let user = new User();
// let user2 = new User('user2');
//
// console.log(user.getName());
// console.log(user2.getName());

//class写法

class User {
    constructor(firstName, lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName(){
        return this.firstName + this.lastName;
    }


}



class Basic {
    static async get_access_token() {
        var appId = config.appId;
        var appSecret = config.appSerect;
        var tokenObj = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`);
        if(!tokenObj.data){
            return null;
        }else {
            if (tokenObj.data.access_token) {
                var access_token = tokenObj.data.access_token;
                return access_token;
            }
        }
    }
}



module.exports = Basic;

let user3 = new User('ji','shuya');
console.log(user3.getFullName());