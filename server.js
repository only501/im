var express = require('express');
var app = express();
// 用http模块创建server
var server = require('http').createServer(app);
// 创建服务端socket
var io=require('socket.io')(server);
var userNo = 0//用户ID，模拟用户名;
// 监听客户端的socket连接；
io.on('connect',function(socket){
    var user = (++userNo);
    io.emit('msg-from-server',user+':------->上线了');
    // 监听socket连接断开事件；
    socket.on('disconnect',function(){
      io.emit('msg-from-server',user+':-------->下线了')
    });
    // 监听客服端的消息，事件名可以自定义，接受客服端消息，并把消息发送给客服端；
    socket.on('msg-from-client',function(data){
        io.emit('msg-from-server',user+':'+data)
    })
});
// 静态资源目录
app.use(express.static('public'));
server.listen('9000',function(){
    console.log('server is running on 9000')
})