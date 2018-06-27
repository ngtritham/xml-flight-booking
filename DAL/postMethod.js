const fs = require("fs")
const xml2js = require("xml2js")
const xmldom = require('xmldom')

module.exports.addPhieuDatCho = function (json) {
    const path = __dirname + "/DATA/bookingInfo.xml"

    fs.readFile(path, "utf-8", function (err, data) {
        if (err) console.log(err);
        // we log out the readFile results    
        console.log(data);
        // we then pass the data to our method here
        xml2js.parseString(data, function (err, result) {
            if (err) console.log(err);
            result.Danh_sach_phieu_dat_cho.Phieu_dat_cho.push({ "$": json })
            saveFile(path, result)
        });
    });
}

module.exports.addTaiKhoan = function (json) {
    const path = __dirname + "/DATA/account.xml"

    fs.readFile(path, "utf-8", function (err, data) {
        if (err) console.log(err);
        // we log out the readFile results    
        console.log(data);
        // we then pass the data to our method here
        xml2js.parseString(data, function (err, result) {
            if (err) console.log(err);
            result.Danh_sach_tai_khoan.Tai_khoan.push({ "$": json })
            saveFile(path, result)
        });
    });
}

module.exports.update_FlightInfo = (MaCB) => {
    const path = __dirname + "/DATA/flightInfo.xml"

    let ret;
    data = fs.readFileSync(path);
    xml2js.parseString(data, function (err, result) {
        ret = result
    });

    for (let i = 0;  i < Object.keys(ret.Danh_sach_chuyen_bay.Chuyen_bay).length; i++) {
        if (ret.Danh_sach_chuyen_bay.Chuyen_bay[i].$.Ma_chuyen_bay == MaCB) {
            if (ret.Danh_sach_chuyen_bay.Chuyen_bay[i].$.So_ghe_trong == '0') {
                return 'false'
            }

            ret.Danh_sach_chuyen_bay.Chuyen_bay[i].$.So_ghe_trong = (parseInt(ret.Danh_sach_chuyen_bay.Chuyen_bay[i].$.So_ghe_trong) - 1).toString()
            ret.Danh_sach_chuyen_bay.Chuyen_bay[i].$.So_ghe_dat = (parseInt(ret.Danh_sach_chuyen_bay.Chuyen_bay[i].$.So_ghe_dat) + 1).toString()
            break;
        }
    }

    saveFile(path, ret)
    return "true";
}

function saveFile(url, json) {
    let builder = new xml2js.Builder();
    let xml = builder.buildObject(json);

    fs.writeFile(url, xml, function (err, data) {
        if (err) console.log(err);
        console.log("successfully written our update xml to file");
    })
}