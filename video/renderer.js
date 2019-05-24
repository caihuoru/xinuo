// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
function again(){
    if(duankai){
                clearInterval(duankai);
              }
    var ws = new WebSocket("ws://192.168.1.186:8181");
    ws.onopen = function()
         {

            if(duankai){
                clearInterval(duankai);
              }
            // Web Socket 已连接上，使用 send() 方法发送数据
            ws.send(
                JSON.stringify({
                  index: index,
                  status: 1
                })
              );
            // alert("数据发送中...");
         };
          
         ws.onmessage = function(evt) {
            if(duankai){
                clearInterval(duankai);
              }
            var data = JSON.parse(evt.data);
            console.log(data);
            //   $(".video video").attr("src",data.link);
            index=data.index;
            if(data.reset){
              Media.currentTime=0;
            }
            if(data.volume || data.volume==0){
              volume=data.volume;
              Media.volume=volume;
		        console.log(volume)
            }
            if(data.shutdown){
              $(".gj").trigger();
            }
            
            if(data.link){
              console.log(data.link)
              if(data.link != video_link){
              $(".video video").attr("src",data.link);
              video_link = data.link;
              }
            }

    
            
              if(data.status==2){
                Media.pause();
                console.log("暂停")
              }else if(data.status==1){
                setTimeout(function(){
                  Media.play();
                  console.log("播放")
                },100)
                
              }else{
                
              if(data.status==2){
                Media.pause();
                console.log("暂停")
              }else if(data.status==1){
                setTimeout(function(){
                  Media.play();
                  console.log("播放")
                },100)
                
              }
            }
        }
          
         ws.onclose = function()
         { 
            // 关闭 websocket
            console.log("连接已关闭...");
            duankai=setInterval(function(){
            again();
            },1000)
         };
  }