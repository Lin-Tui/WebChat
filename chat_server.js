const socketio=require('socket.io');
const emoji = require('node-emoji');
var io,
    userNames={},   //socket id对应的username
    userPicture = {},
    allRooms={},    //聊天室--人数
    currentRoom={}; //sockid--聊天室
    
module.exports.listen=function(server){
    io=socketio.listen(server); //启动Socket.IO服务器允许它搭载在已有的HTTP服务器上
    io.sockets.on('connection',function(socket){//定义每个用户连接的处理逻辑 
        console.log(socket.handshake.headers.cookie);
        let words = socket.handshake.headers.cookie;
        // 将cookie字符串转换成对象
        let wordArray = cookieStringToArray(words);
        let username = wordArray['username'];
        let pictureIndex = wordArray['pictureIndex'];
        userNames[socket.id] = username;
        userPicture[socket.id] = pictureIndex;
        joinRoom(io, socket,'小树洞'); //在用户连接上来时把他放入默认聊天室里
        handleMessageBroadcasting(socket,userNames);//处理用户的消息
        handleRoomJoining(socket);//处理聊天室的创建和变更

        handleClientDisconnection(socket,userNames);//定义用户断开连接后的清楚逻辑
    });
};

//加入某个聊天室
function joinRoom(io, socket,room){
    socket.join(room);//让用户进入房间
    var num=allRooms[room];
    if(num===undefined){
        allRooms[room]=1;
    }else{
        allRooms[room]=num+1;
    }
    currentRoom[socket.id]=room;//记录用户的当前房间
    io.to(socket.id).emit('joinResult',{username: userNames[socket.id],room:room}); //让用户知道他们进入了新的房间
    socket.to(room).emit('joinResult',{username: userNames[socket.id],room:room}); //让用户知道他们进入了新的房间

    /*
    var usersinRoom=io.sockets.adapter.rooms[room];//确定有哪些用户在这个房间里
    if(usersinRoom.length>1){ //如果不止一个用户在这个房间里，汇总下有哪些用户
        var usersInRoomSummary='Users currently in '+room+' : ';
        for(var index in usersinRoom.sockets){
            if(index!=socket.id){
                usersInRoomSummary+=nickNames[index]+',';
            }
        }
        socket.emit('message',{text:usersInRoomSummary}); //将房间里其他用户的汇总发送给这个用户
    }
    */
}



//发送聊天消息 Socket.IO的broadcase函数是用来转发消息的.
function handleMessageBroadcasting(socket){
    socket.on('message',function(message){
        //console.log('message:---'+JSON.stringify(message));
        socket.broadcast.to(message.room).emit('message',{
            username:userNames[socket.id],
            otherPictureIndex:userPicture[socket.id],
            text: message.text
        });
    });
}

//加入/创建某个聊天室
function handleRoomJoining(socket){
    socket.on('join',function(room){
        /*var temp=currentRoom[socket.id];
        delete currentRoom[socket.id];
        socket.leave(temp);
        var num=--allRooms[temp];
        if(num==0)
            delete allRooms[temp];*/
        joinRoom(io,socket,room.newRoom);
    });
}

//socket断线处理
//当用户离开聊天程序时，从NickNames和namesUsed中移除用户的昵称
function handleClientDisconnection(socket){
    socket.on('disconnect',function(){
        //console.log(userNames[socket.id]+ 'disconnect');
        //console.log(currentRoom[socket.id]);
        socket.broadcast.to(currentRoom[socket.id]).emit('offline',{username:userNames[socket.id]});
        allRooms[currentRoom[socket.id]]--;
        delete userNames[socket.id];
        delete userPicture[socket.io];
        delete currentRoom[socket.id];
    })
}







function cookieStringToArray(textString) {

	var words = [];
	var nowPoint = 0;
	var tempKey = '';
	for (let i = 0; i < textString.length; i += 1) {
		
		if (textString[i] === '=') {
			// 前面是key
			for (let j = nowPoint; j < i; j += 1) {
				tempKey += textString[j];
			}
			nowPoint = i;
			// console.log('tempKey:' + tempKey);
			// console.log('nowPoint:' + nowPoint);
		}
		if (textString[i] === ';') {
			// ;后有一个空格
			nowPoint += 1;
			let tempValue = '';
			for (let j = nowPoint; j < i; j += 1) {
				tempValue += textString[j];
				nowPoint += 1;
			}
			// console.log(';;;nowPoint:' + nowPoint);
			nowPoint += 2;
			i += 2;
			words[tempKey] = tempValue;
			tempKey = '';
		}
		if (i === textString.length - 1) {
			nowPoint += 1;
			let tempValue = '';
			for (let j = nowPoint; j <= i; j += 1) {
				tempValue += textString[j];
				nowPoint += 1;
			}
			// console.log(';;;nowPoint:' + nowPoint);
			nowPoint += 2;
			i += 2;
			words[tempKey] = tempValue;
			tempKey = '';
		}
	}
	return words;
}