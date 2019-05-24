var config = require('./config.json');  // 以下为使用到配置的部分代码： if (!config.debug && config.oneapm_key) { require('oneapm'); }  app.use(session({   secret: config.session_secret,   store: new RedisStore({     port: config.redis_port,     host: config.redis_host, }),   resave: true,   saveUninitialized: true, }))  app.listen(config.port, function () {   logger.log('NodeClub listening on port', config.port);   logger.log('God bless love....');   logger.log('You can debug your app with http://' + config.hostname + ':' + config.port);   logger.log(''); });

console.log(config)

var express = require('express');
var app = express();
var dataUrl="./video/";
var data = [
         {
            code:0,
            msg:"请求成功",
            link:"./video/video1.mp4",
            status:"0",
            index:1,
            volume:1,
            forEach:false
         },
         {
            code:-1,
            msg:"请求失败或没有数据",
         }
      ]



// 串口
var SerialPort = require('serialport')
//Opening a Port
var serialPort = new SerialPort('COM3', {
    //波特率，可在设备管理器中对应端口的属性中查看
    baudRate : 9600,
    autoOpen:false,
    dataBits:8,
    stopBits:1,
    // parity:Parity.None,
    flowControl:0

})
var num=0;

// 创建事件
var events = require("events");

//创建事件监听对象
var  emitter = new events.EventEmitter();


// websocket
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8181});

// 连接池
var clients = [];

wss.on('connection', function(ws) {
    var stop=false;
    // 将该连接加入连接池
    clients.push(ws);
    ws.on('message', function(message) {
        console.log("服务器收到数据")
        message =JSON.parse(message);
        data[0].status= message.status;
        
        data[0].index=message.index;
        data[0].name="video"+message.index+".mp4";
        data[0].link=dataUrl+"video"+message.index+".mp4";
          if(stop){
            clearInterval(stop);
            console.log(1)
          }
        // 调用串口
        serialPort_(num)
        // 广播消息
        //     stop=setInterval(function(){
        //     var jsonData = JSON.stringify(data[0]);
        //     clients.forEach(function(ws1){
            
        //         ws1.send(jsonData);
          
        // })
        // },500) 


    //监听事件some_event
    emitter.addListener("some_event",function(){
        console.log("事件触发，调用此回调函数");
            var jsonData = JSON.stringify(data[0]);
                        clients.forEach(function(ws1){
            
                ws1.send(jsonData);
          
        })
    });
    });

    ws.on('close', function(message) {
        // 连接关闭时，将其移出连接池
        clients = clients.filter(function(ws1){
            return ws1 !== ws
        })
    });
});

// 55 AA 00 00 01 00 1D
var buffer = new Buffer([0x55, 0xAA, 0x00, 0x00, 0x01, 0x00, 0x1D]);


// 串口输入指令
function serialPort_(num){
    // if (!SerialPortName.IsOpen)
    //   {
    //         SerialPortName.open();
    //   }
        // console.log(SerialPortName.open()+"???")
  
        // 第一次打开串口
        serialPort.open(function (err) {
            // console.log('IsOpen:',serialPort.isOpen)
            // console.log('err:',err)
            console.log("asdfas")
            function writeAndDrain (data,callback) {
                serialPort.write(data, function () {
                  serialPort.drain(callback);
                });
              }
              setTimeout(function(){
                writeAndDrain(buffer,function(){
                    console.log()
                })
              },1000);
             
        })
    }
        
       
    serialPort_()   

//连接串口后进行写入指令操作

//指令监听
serialPort.on('data',function (data_) {
    // 打印回来的数据
    console.log('data received: '+data_)
    console.log(data_.toString())
    data[0].SerialPort_data=data_.toString()
    // wss.on('connection', function(ws) {
    //     ws.on('message', function(message) {
    //         ws.send(JSON.stringify(data[0].SerialPort_data));
    //     })
    // })
})
//错误监听
serialPort.on('error',function (error) {
    console.log('error: '+error)
})

//获取端口列表
SerialPort.list(function (error, ports) {
    ports.forEach(function(port) {
        console.log(port.comName);
        console.log(port.pnpId);
        console.log(port.manufacturer);
        console.log("21")
        // setInterval(function)
    });
})

