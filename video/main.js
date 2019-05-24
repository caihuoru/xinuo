var config={   
  "localIp":"192.168.1.186",
  "port":10089, 
  "serialPort": {
      "baudRate" : 9600,
      "autoOpen":false,
      "dataBits":8,
      "stopBits":1,
      "flowControl":0
  }, 
  "video": ["./video/video1.mp4","./video/video2.mp4","./video/video3.mp4.","./video/video4.mp4"], 
  "websocket":{
      "link":"ws://192.168.1.186",
      "port":8181
  },
  "mainWindow":{
      "width":1920,
      "height":1080,
      "fullscreen":true
  }
}

// Modules to control application life and create native browser window
const {app,globalShortcut,BrowserWindow} = require('electron')
var fs = require('fs');
let exec = require('child_process').exec;
exec('node websoket.js', err => {
  
  if (err) {
      //...
      console.log(err)
      return false
  }
})


//通过传回来的页数，进行分页模拟
var events = require('events');
var emitter = new events.EventEmitter();

// var config = {};
// var config_data
// function diff(a){
// 	return a;
// }


// fs.readFile('./config.json',function(err,data){
//         if(err){
//             console.error(err);
//         }
//         config = diff(JSON.parse(data))
//         console.log(console.log(config))
//         emitter.emit('someEvent22');
//         //把数据读出来
//     })

//     emitter.on('someEvent22', function() {

      
//       // console.log(config)
      
//     });
console.log(config)


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: config.mainWindow.width,
    height:config.mainWindow.height,
    webPreferences: {
      nodeIntegration: true
    },
    frame:false,
    fullscreen: config.mainWindow.fullscreen//全屏窗口

    
  })

  // 解决不能主动播放
  app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
  // and load the index.html of the app.
  mainWindow.loadFile('kehu.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  globalShortcut.register('ESC', () => {
    mainWindow.setFullScreen(false);
})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
