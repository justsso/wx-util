var shequ = {
    appId: 'wx7b0490be1c78b5f0',
    appSerect: '7dac9ee70656f81a4633c92a310db435'
}
var zhongxin = {
    appId: 'wx91fd7108f31d3d52',
    appSerect: '0df63271698623b2303e455d4efbdbe2'
}

var test = false;

const config = {
    port: test ? 3006 : 3005,
    appId: test ? zhongxin.appId : shequ.appId,
    appSerect: test ? zhongxin.appSerect : shequ.appSerect,
    database: {
        name: test ? 'zhongxin':'shequ',
        userName: 'xiaoya',
        password: '123456',
        config: {
            host: '118.190.153.113',
            dialect: "postgres",
            pool: {
                max: 5,
                min: 0,
                idle: 200000,
                acquire: 200000
            },
            logging: false
        }
    },
    TOKEN: 'xiaoya',
    wx: {
        number: 5,
        text: ''
    }
}

module.exports = config