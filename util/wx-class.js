const {parseString} = require('xml2js');


class wxObj {
    parseXML(){
        try {
            return new Promise((resolve, reject) => {
                parseString(xml,  (err, result) => {
                    err && console.log(err);
                    resolve(result);
                })
            })
        }catch (e) {
            throw (e);
        }
    }
}

module.exports = wxObj;