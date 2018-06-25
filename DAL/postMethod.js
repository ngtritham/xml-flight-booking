const fs = require("fs")
const xml2js = require("xml2js")

module.exports.addPhieuDatCho = function (json) {
    const path = __dirname + "/DATA/bookingInfo.xml"
    // if (json.Ma_chuyen_bay === undefined ||
    //     json.Hanh_khach === undefined ||
    //     json.CMND === undefined ||
    //     json.Hang_ve === undefined ||
    //     json.Gia_tien === undefined)
    //     return 

    json = {
        "Ma_chuyen_bay": "CB03",
        "Hanh_khach": "Barack Obama",
        "CMND": "536964859",
        "Hang_ve": 1,
        "Gia_tien": "3.400.000 VND"
    }

    fs.readFile(path, "utf-8", function (err, data){
        if(err) console.log(err);
        // we log out the readFile results    
        console.log(data);
        // we then pass the data to our method here
        xml2js.parseString(data, function(err, result){
            if(err) console.log(err);
            result.Danh_sach_phieu_dat_cho.Phieu_dat_cho.push({"$": json})
            saveFile(path, result)
        });
    });       
}

function saveFile(url, json) {
    let builder = new xml2js.Builder();
    let xml = builder.buildObject(json);

    fs.writeFile(url, xml, function (err, data) {
        if (err) console.log(err);
        console.log("successfully written our update xml to file");
    })
}