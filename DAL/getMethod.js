'user strict'

const fs = require('fs')
const xml2js = require('xml2js')
const path = __dirname;


//Get danh sách cửa hàng
module.exports.get_DSChuyenBay = () => {
    let ret;
    data = fs.readFileSync(__dirname + '/DATA/flightInfo.xml');
    xml2js.parseString(data, function (err, result) {
        ret = result
    });

    return ret;
}

module.exports.get_DSTaiKhoan = () => {
    let ret;
    data = fs.readFileSync(__dirname + '/DATA/account.xml');
    xml2js.parseString(data, function (err, result) {
        if (err) {
            console.log("Error: " + err);
        }
        console.log(result);
        ret = result;
    });

    return ret;
}

module.exports.get_MonthReport = () => {
    let ret;
    data = fs.readFileSync(__dirname + '/DATA/totalReport.xml');
    xml2js.parseString(data, function (err, result) {
        ret = result.Bao_cao_doanh_thu
    });

    return ret;
}

/*
const get_DanhSach_Tivi = () => {
    fs.readdirSync(path + '/Tivi/').forEach(file => {
        let filePath = path + '/Tivi/' + file
        let data = fs.readFileSync(filePath, 'utf-8')

        let parser = new xml2js.Parser()
        parser.parseString(data, function (err, result) {
            danhSach_Tivi.push({ 'Tivi': result.Tivi.$ })
        })
    })

    let builder = new xml2js.Builder()
    let xml = builder.buildObject(danhSach_Tivi)

    return xml
}
*/