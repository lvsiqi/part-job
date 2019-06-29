
import store from '../store'
var websock = null;
var global_callback = null;
var serverPath ='ws://'+'localhost:8080'+'/part-job-api'+'/websocket/'


function initWebSocket(userAccount){
  var wsuri = serverPath+userAccount
  websock = new WebSocket(wsuri);
  websock.onmessage = function(e){
    websocketonmessage(e);
  }
  websock.onclose = function(e){
    websocketclose(e);
  }
  websock.onopen = function () {
    websocketOpen();
  }

  //连接发生错误的回调方法
  websock.onerror = function () {
    console.log("WebSocket连接发生错误");
  }
}

// 实际调用的方法
function sendSock(agentData,callback){
  global_callback = callback;
  if (websock.readyState === websock.OPEN) {
    //若是ws开启状态
    websocketsend(agentData)
  }else if (websock.readyState === websock.CONNECTING) {
    // 若是 正在开启状态，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData,callback);
    }, 1000);
  }else {
    // 若未开启 ，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData,callback);
    }, 1000);
  }
}

//数据接收
function websocketonmessage(e){
 /* global_callback(JSON.parse(e.data));*/
  store.commit('changeCurrentMessage',JSON.parse(e.data))
}

//数据发送
function websocketsend(agentData){
  websock.send(JSON.stringify(agentData));
}

//关闭
function websocketclose(e){
  console.log("connection closed (" + e.code + ")");
}

function websocketOpen(e){
  console.log("连接成功");
}

function close() {
  websock.close()
}
const mysocket={
  sendSock,
  initWebSocket,
  close
}
export default mysocket
