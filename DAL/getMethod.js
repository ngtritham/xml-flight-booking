'user strict'

const fs = require('fs')
const xml2js = require('xml2js')

const path = __dirname;

let danhSach_Tivi = []

//Get danh sách cửa hàng
const get_CuaHang = () => {
    let data = fs.readFileSync(path + '/Cua_hang/Cua_hang.xml', 'utf-8')
    return data
}

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

module.exports = {
    get_CuaHang: get_CuaHang,
    get_DanhSach_Tivi: get_DanhSach_Tivi
}
