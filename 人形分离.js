var express = require("express");
var app = express();
// var request = require("request");
var fs = require('fs');


var AipBodyAnalysisClient = require("baidu-aip-sdk").bodyanalysis;

// 设置APPID/AK/SK
var APP_ID = "15778543";
var API_KEY = "dyIov2uj6h6HDdEPY3CAcobY";
var SECRET_KEY = "SsOKYeQuPnl2DvPoBkPr1XTuGFznY7a7";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipBodyAnalysisClient(APP_ID, API_KEY, SECRET_KEY);

// var fs = require("fs");
var data = [
  {
    code: 0,
    msg: "请求成功",
    img: ""
  },
  {
    code: -1,
    msg: "请求失败或没有数据"
  }
];

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
//  
app.get("/SD", function(req, res) {
//   request.post(
//     {
//       url: "https://api.remove.bg/v1.0/removebg",
//       formData: {
//         image_file: fs.createReadStream("test.jpg"),
//         size: "auto"
//       },
//       headers: {
//         "X-Api-Key": "1HDCFQqVoW5ZXoumGStKbmyu"
//       },
//       encoding: null
//     },
//     function(error, response, body) {
//       if (error) return console.error("Request failed:", error);
//       if (response.statusCode != 200)
//         return console.error(
//           "Error:",
//           response.statusCode,
//           body.toString("utf8")
//         );
//       fs.writeFileSync("no-bg.png", body);
//     }
//   );


var image = fs.readFileSync("test.jpg").toString("base64");
// 调用人像分割
client.bodySeg(image).then(function(result) {
    // console.log(JSON.stringify(result));
    data[0].img=result.scoremap;
    res.send(data[0]);
}).catch(function(err) {
    // 如果发生网络错误
    console.log(2);
});

// 如果有可选参数
var options = {};
options["type"] = "labelmap";

// 带参数调用人像分割
client.bodySeg(image, options).then(function(result) {
    // console.log(JSON.stringify(result));
    data[0].img=result.scoremap;
    res.send(data[0]);
}).catch(function(err) {
    // 如果发生网络错误
    console.log(1);
});
res.send(data[0]);
 
  //触发事件some_event
});

var server = app.listen(1000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("服务器启动成功");
});
