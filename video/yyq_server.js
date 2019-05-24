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
var serialPort = new SerialPort('COM6', {
    //波特率，可在设备管理器中对应端口的属性中查看
    baudRate : 9600,
    autoOpen:false,
    dataBits:8,
    stopBits:1,
    // parity:Parity.None,
    // flowControl:0

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
        serialPort_(message.d)
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


var open = new Buffer([0x55, 0xAA, 0x00, 0x00, 0x01, 0x00, 0x1D]);
var off = new Buffer([0x55, 0xAA, 0x00, 0x00, 0x01, 0x00, 0x1E]);
// 串口输入指令
function serialPort_(d){
    // if (!SerialPortName.IsOpen)
    //   {
    //         SerialPortName.open();
    //   }
        // console.log(SerialPortName.open()+"???")
  
        // 第一次打开串口
        serialPort.open(function (err) {
            // console.log('IsOpen:',serialPort.isOpen)
            // console.log('err:',err)
            // console.log("asdfas")
            function writeAndDrain (data,callback) {
                serialPort.write(data, function () {
                  serialPort.drain(callback);
                });
              }
              emitter.addListener("some_event1",function(){
                // console.log(1111)
                writeAndDrain(open,function(){
                    console.log("开启")
                })
            });
            emitter.addListener("some_event2",function(){
                // console.log(2222)
                writeAndDrain(off,function(){
                    console.log("关闭")
                })
            });
            if(d){
                setTimeout(function(){
                    writeAndDrain(off,function(){
                        console.log("关闭")
                    })
                  },500);
            }else{
                setTimeout(function(){
                    writeAndDrain(open,function(){
                        console.log("开启")
                    })
                  },1000);
            }
              
             
        })
    }
        
       
    

//连接串口后进行写入指令操作

//指令监听
serialPort.on('data',function (data_) {
    // 打印回来的数据
    console.log(data_)
    // console.log(data_.toString())
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

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//  视频播放
app.get('/SD/YYQ/playVideo', function (req, res) {
    console.log("ccc")
       if(req.query.status){
        data[0].status= req.query.status;
        // 视频名字
         data[0].name="video"+req.query.index+".mp4";
        //  视频链接
         data[0].link=dataUrl+"video"+req.query.index+".mp4";
         data[0].index=req.query.index;
       }else{

       }

    
        // serialPort.write(off, (err) => {
        //     if (err) return console.log('write Error: ', err.message);
        // })
        console.log(req.query.d)
        emitter.emit("some_event1");
       
       res.send(data[0]);
       //触发事件some_event
       emitter.emit("some_event");
    
})
//暂停播放
app.get('/SD/YYQ/pauseVideo', function (req, res) {
    data[0].status= "2";
       //触发事件some_event
       emitter.emit("some_event");
    
})
//继续播放
app.get('/SD/YYQ/resumeVideo', function (req, res) {
    data[0].status= "1";
       //触发事件some_event
       emitter.emit("some_event");
    
})

// 设置循环播放
app.get('/SD/YYQ/loopVideo', function (req, res) {
    data[0].forEach=true
    mitter.emit("some_event");
    res.send(data[1]);
 })

 // 取消循环播放
app.get('/SD/YYQ/cancelLoopVideo', function (req, res) {
    data[0].forEach=false
    mitter.emit("some_event");
    res.send(data[1]);
    
     
 })

  // 设置音量
app.get('/SD/YYQ/setVolume', function (req, res) {
    if(req.query.value){
        data[0].volume=(value)*0.1
    }
    mitter.emit("some_event");
    res.send(data[1]);
     
 })
  
   // 重置
app.get('/SD/YYQ/reset', function (req, res) {
    console.log("重置");
    res.send(data[1]);
     
 })
    // 关机
app.get('/SD/YYQ/shutdown', function (req, res) {
    const exec = require('child_process').exec;//产生exec，同时传入.bat文件
exec('d:/my.bat', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});
    data[0].shutdown=true;
    emitter.emit("some_event");
    res.send(data[1]);
    delete data[0].shutdown;
     
 })
     //获取视频状态
app.get('/SD/YYQ/status', function (req, res) {
    data[0].status=req.query.status;

    console.log("获取视频状态");
    res.send(data[1]);
     
 })
//  POST 请求
app.post('/SD/YYQ/playVideo', function (req, res) {
   
   console.log("id参数是 : "+ req.body.index)
   res.send(data[1]);
})

var server = app.listen(10089, function () {
 
    var host = server.address().address
    var port = server.address().port
   console.log("服务器启动成功")
  
   
  })