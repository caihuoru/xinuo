var express = require('express');
var app = express();
var dataUrl="/video/";
var data = [
         {
            code:0,
            name:"",
            msg:"请求成功",
            link:"",
            status:""
         },
         {
            code:1,
            msg:"请求失败或没有数据",
         }
      ]
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//  视频播放
app.get('/playVideo', function (req, res) {
   if(req.query.status==0){
     data[0].status="正在播放"
   }else if(req.query.status==1){
      data[0].status="已暂停"
   }else{
      data[0].status="无状态"
   }
   // 视频名字
    data[0].name="video"+req.query.index+".mp4";
   //  视频链接
    data[0].link=dataUrl+"video"+req.query.index+".mp4";
    var jsonData = JSON.stringify(data[0]);
   //  获取参数
    console.log("id参数是 : "+ req.query.index)
    res.send(jsonData);
    
})

// 视频暂停
app.get('/pauseVideo', function (req, res) {
   if(req.query.status==0){
      data[0].status="正在播放"
    }else if(req.query.status==1){
       data[0].status="已暂停"
    }else{
       data[0].status="无状态"
    }
    data[0].name="video"+req.query.index+".mp4";
    delete data[0].link;
     var jsonData = JSON.stringify(data[0]);
     res.send(jsonData);
     
 })
  
 // 继续播放视频
app.get('/resumeVideo', function (req, res) {
   if(req.query.status==0){
      data[0].status="正在播放"
    }else if(req.query.status==1){
       data[0].status="已暂停"
    }else{
       data[0].status="无状态"
    }
    data[0].name="video"+req.query.index+".mp4";
    delete data[0].link;
     var jsonData = JSON.stringify(data[0]);
     res.send(jsonData);
     
 })

 // 设置循环播放
app.get('/loopVideo', function (req, res) {
    console.log("设置循环播放");
    res.send(data[1]);
     
 })

 // 取消循环播放
app.get('/cancelLoopVideo', function (req, res) {
    console.log("取消循环播放");
    res.send(data[1]);
     
 })

  // 设置音量
app.get('/setVolume', function (req, res) {
    console.log("设置音量");
    res.send(data[1]);
     
 })
  
   // 重置
app.get('/reset', function (req, res) {
    console.log("重置");
    res.send(data[1]);
     
 })
    // 关机
app.get('/shutdown', function (req, res) {
    console.log("关机");
    res.send(data[1]);
     
 })
     //获取视频状态
app.get('/status', function (req, res) {
   var status=req.query.status;

    console.log("获取视频状态");
    res.send(data[1]);
     
 })
//  POST 请求
app.post('/playVideo', function (req, res) {
   
   console.log("id参数是 : "+ req.body.index)
   res.send(data[1]);
})
 


var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 console.log("服务器启动成功")

 
})