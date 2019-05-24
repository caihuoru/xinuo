//1.导入http模块
var http = require('http');

//2.创建一个服务器对象
var server = http.createServer();
/**
 * 第一个参数：request:监听客户端请求事件
 * 第二个参数：回调函数 function(req,res)
 * 
 */
server.on('request',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",' 3.2.1');
    res.setHeader("Content-Type", "text/html"); 
    /**server.on方法在什么时候被调用：服务器接收到客户端的请求时会调用
     * 特点：每接收到一次客户端请求，该方法会执行一次，
     * 
     */
    //  获取id
    var id=req.url.split("=")[1];
    //通常req对象有三个对象：路径，请求方法，请求的参数（和接口文档文档）
    console.log(req.url);//请求的路径
    console.log(id);
    if(id=="1"){
        // res.end("http://www.jplayer.org/video/m4v/Incredibles_Teaser.m4v");
        res.end("./video/Incredibles_Teaser.m4v");
    }else if(id=="2"){
        // res.end("http://video.699pic.com/videos/95/24/71/b_ebMwbT7ZcA271549952471_10s.mp4");
        res.end("./video/020B0144.MOV");
    }else if(id=="3"){
        // res.end("http://video.699pic.com/videos/70/16/46/b_2ZPa4RBBiVK11546701646_10s.mp4");
        res.end("./video/dh.mp4");
    }else if(id=="4"){
        // res.end("http://video.699pic.com/videos/99/27/66/9zSeu1Z8BuwY1534992766_10s.mp4");
        res.end("./video/nPZUZf11Tj6P1534313888_10s.mp4");
    }


});


server.listen(3000,function(){
    console.log('服务器启动成功');
});




/*server*/
// const dgram = require('dgram'); 
// const server = dgram.createSocket('udp4'); //创建udp服务器
// const multicastAddr = '224.100.100.100';

// //以下server.on 都是在监听不同信号
// server.on('close',()=>{ // ()=> 是 ES6的箭头函数，写成 function()也是可以的
//     console.log('socket已关闭');
// });

// server.on('error',(err)=>{
//     console.log(err);
// });

// server.on('listening',()=>{
//     console.log('socket正在监听中...');
//     server.addMembership(multicastAddr); //加入组播组
//     server.setMulticastTTL(128);

// });

// server.on('message',(msg,rinfo)=>{
//     console.log(`receive message from ${rinfo.address}:${rinfo.port}`);
// });

// function sendMsg(){
//     var message = '大家好啊，我是服务端.';
//     server.send(message,0,message.length,8061,multicastAddr);
//     //通过server.send发送组播
//     //参数分别是，数据（buffer或者string），偏移量（即开始发送的位子），数据长度，接收的端口，组播组
// }

// server.bind(8060); //绑定端口，不绑定的话也可以send数据但是无法接受

// //循环发送
// setInterval(()=>{
//     sendMsg();
//     console.log("send message");
// },1500);

