'user strict'

const fs = require('fs')
const xml2js = require('xml2js')
const parser = new xml2js.Parser()
const path = __dirname;


//Get danh sách cửa hàng
const get_DSChuyenBay = () => {
    return fs.readFileSync(__dirname + '/DATA/flightInfo.xml')
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

module.exports = {
    get_DSChuyenBay: get_DSChuyenBay
}
