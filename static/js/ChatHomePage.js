var curIndex = 0;
//时间间隔(单位毫秒)，每秒钟显示一张，数组共有3张图片放在img文件夹下
var timeInterval = 5000;

//定义一个存放照片位置的数组，可以放任意个，在这里放3个
var arr = new Array();
arr[0] = "../images/index1.png";
arr[1] = "../images/index2.png";
arr[2] = "../images/index3.png";
arr[3] = "../images/index4.png";
arr[4] = "../images/index5.png";
setInterval(changeImg, timeInterval);
function changeImg() {
    if (curIndex == arr.length - 1) {
        curIndex = 0;
    } else {
        curIndex += 1;
    }
    //设置body的背景图片
    document.body.style.backgroundImage = "url(" + arr[curIndex] + ")";  //显示对应的图片
}
var myModals = document.getElementsByClassName("myModal");
var i;

if (window.WebSocket) {
    console.log('This browser supports WebSocket');
} else {
    console.log('This browser does not supports WebSocket');
}
var socket = io.connect();

var Chat = function (socket) {
    this.socket = socket;
}
Chat.prototype.sendMessage = function (room, text) {
    var mg = {
        room: room,
        text: text
    };
    this.socket.emit('message', mg);
};

//变更房间
Chat.prototype.changeRoom = function (room) {
    this.socket.emit('join', {
        newRoom: room
    });
};

$(document).ready(function () {
    var chatApp = new Chat(socket);
    var username = $.cookie("username");
    var pictureIndex = $.cookie("pictureIndex");
    $('#headPicture').attr('src', '../images/Head' + pictureIndex + '.png');
    $('.myPicture').attr('src', '../images/Head' + pictureIndex + '.png');
    myModals[0].style.display = "block";
    $("#chatPicture").attr("src", "../images/chatSelected.png");
    $("#chatPicture").click(function () {
        for (i = 0; i < myModals.length; i++) {
            myModals[i].style.display = "none"
        }
        $("#friendsListsPicture").attr("src", "../images/friends.png");
        $("#settingsListsPicture").attr("src", "../images/rooms.png");
        myModals[0].style.display = "block";
        $(this).attr("src", "../images/chatSelected.png");
    });


    $('.PrivateChat').delegate('.chatLists','mouseenter', function(event){
        var target = $(event.target);
        $(this).children(".clear").css('display','block');

    });
    $('.PrivateChat').delegate('.chatLists','mouseleave', function(event){
        var target = $(event.target);
        $(this).children(".clear").css('display','none');

    });
    $('.PrivateChat').delegate('.chatLists','mouseleave', function(event){
        var target = $(event.target);
        $(this).children(".clear").css('display','none');

    });
    $('.clear').click(function(){
        $(this).parent().remove();
    });

    $('.GroupChat').delegate('.chatLists1','mouseenter', function(event){
        var target = $(event.target);
        $(this).children(".clear1").css('display','block');

    });
    $('.GroupChat').delegate('.chatLists1','mouseleave', function(event){
        var target = $(event.target);
        $(this).children(".clear1").css('display','none');

    });
    $('.clear1').click(function(){
        console.log('dianyong');
        console.log($(this).parent());
        $(this).parent().remove();
    });

$('.operation').click(function(){
    if($('.operationLists').css('display')=='none'){
        $('.operationLists').css('display','block');
    }else{
        $('.operationLists').css('display','none');
    }
});



    $('.Emotion').mouseenter(function(){
        $('.Emotion').attr('src','../images/expressionSelected.png');
    });
    $('.Emotion').mouseleave(function(){
        $('.Emotion').attr('src','../images/expression.png');
    });  

    $('.Emotion1').mouseenter(function(){
        $('.Emotion1').attr('src','../images/pictureSelected.png');
    });
    $('.Emotion1').mouseleave(function(){
        $('.Emotion1').attr('src','../images/picture.png');
    });  

    $("#friendsListsPicture").click(function () {
        for (i = 0; i < myModals.length; i++) {
            myModals[i].style.display = "none";
        }
        $("#chatPicture").attr("src", "../images/chat.png");
        $("#settingsListsPicture").attr("src", "../images/rooms.png");
        myModals[1].style.display = "block";
        $(this).attr("src", "../images/friendsSelected.png");
    });
    $("#settingsListsPicture").click(function () {
        for (i = 0; i < myModals.length; i++) {
            myModals[i].style.display = "none";
        }
        $("#friendsListsPicture").attr("src", "../images/friends.png");
        $("#chatPicture").attr("src", "../images/chat.png");
        myModals[2].style.display = "block";
        $(this).attr("src", "../images/roomsSelected.png");
    });

    $('.sendWord').click(function () {
        var mg = $('.myInput').val();
        if (mg == '') {
            return;
        } else {
            chatApp.sendMessage($('.ChattingName').text(), mg);
            let originText = mg;
            let emojText = '';
            for (let i = 0; i < originText.length; i++) {
                if (originText[i] == '[')
                {
                    i++;
                    let tempText = '';
                    let num = 0;
                    for (let j = i; originText[j] != ']'; j++, num++)
                    {
                        tempText += originText[j];
                    }
                    tempText = '<img src="../images/emoj/' + tempText + '" />';
                    emojText += tempText;
                    i = i + num;
                }
                else {
                    emojText += originText[i];
                }
            }
            $('.myConversation').append('<div class="myWords">' + '<img class="myPicture"'
                + 'src="../images/Head' + pictureIndex + '.png" />'
                + '<div class="myWord">' + emojText + '</div></div>');
            $('.myInput').val('');
            $('.myConversation').scrollTop($('.myConversation')[0].scrollHeight);
        }

    });

    $('.addFriends').click(function () {
        if ($('.add').css('display') == "none") {
            $('.add').css('display', 'block');
        } else {
            $('.add').css('display', 'none');
        }
    });
$('.Emotion').click(function(){
    if($('.widget-layer').css('display')=='none'){
        $('.widget-layer').css('display','block');
    }else{
        $('.widget-layer').css('display','none');
    }
});
    $('.addRooms').click(function () {
        $('.createRoom').css('display', 'block');
        $('.add').css('display', 'none');

    });
    $('#cancel').click(function () {
        $('.createRoom').css('display', 'none');
    });

    $('#sure').click(function () {
        var newRoomName = $('.create').val();
        if (newRoomName == '') {
            return;
        } else {
            chatApp.changeRoom(newRoomName);
            $('.createRoom').css('display', 'none');
            $('.addRoomSuccess').css('display', 'block');
            $('.create').val('');
            setTimeout(function () {
                $('.addRoomSuccess').css('display', 'none');
            }, 800)
            $('#0').after('<div class="myConversation" id = '
            +newRoomName+'>'+'</div>');
            $('.myConversation[id!='+newRoomName+']').css('display','none');
           $('#'+newRoomName).css('display','block');
           $('.ChattingName').html(newRoomName);
            $('.myCreate').append('<div class="room"><div class="roomName"'
            +'id="'+newRoomName+'0">'+newRoomName
            +'</div><div class="number">'+'3人'+'</div></div>');
            $('.GroupChat').append('<div class="chatLists1"><div class="roomListName">'
            +newRoomName+'</div><div class="clear1">×</div>'
            +'<div class="roomNumber">1人</div></div>');

            
        }
        $('#'+newRoomName+'0').click(function(){
            $('.myConversation[id!='+newRoomName+']').css('display','none');
            $('#'+newRoomName).css('display','block');
            $('.ChattingName').html(newRoomName);
        })
    });

    $('.GroupChat').delegate('.chatLists1','click', function(event){
        var target = $(event.target);
        var roomId = $(this).children(".roomListName").html();
        $('.myConversation[id!='+roomId+']').css('display','none');
        $('#'+roomId).css('display','block');
        $('.ChattingName').html(roomId);
    });
/*
    $('.myCreate').delegate('.room','click', function(event){
        var targetId = $(event.target).attr('id');
        $('.myConversation:(target)').css('display','none');
        .css('display','block');
    });*/

    $('#小树洞0').click(function(){
        $('.myConversation[id!=小树洞]').css('display','none');
        $('#小树洞').css('display','block');
        $('.ChattingName').html('小树洞');
    });
    socket.on('joinResult', function (result) { //显示房间变更结果
       
        var roomId ='#'+result.room;
        $(roomId).append('<div class="systemMessage">' + result.username + '加入' + result.room + '</div>');
        console.log(result.username + '加入了' + result.room);
    });


    socket.on('offline', function (data) {
        console.log(data);
        $('.myConversation').append('<div class="systemMessage">' + data.username + '退出群聊' + '</div>');

    });

    socket.on('message', function (message) {//显示接收到的消息

        // var mg = JSON.parse(message);
        let originText = message.text;
        let emojText = '';
        for (let i = 0; i < originText.length; i++) {
            if (originText[i] == '[')
            {
				i++;
				let tempText = '';
				let num = 0;
                for (let j = i; originText[j] != ']'; j++, num++)
                {
                    tempText += originText[j];
                }
				tempText = '<img src="../images/emoj/' + tempText + '" />';
				emojText += tempText;
				i = i + num;
            }
			else {
				emojText += originText[i];
			}
        }
        $('.myConversation').append('<div class="otherWords">' + '<img class="otherPicture"'
            + 'src="../images/Head' + message.otherPictureIndex + '.png" />'
            + '<div class = "otherName">' + message.username + '</div>'
            + '<div class="otherWord">' + emojText + '</div></div>');
        $('.myConversation').scrollTop($('.myConversation')[0].scrollHeight);
    });

    $("[id$='.gif']").click(function(){
        console.log(this.id);
        $('.myInput').val($('.myInput').val() + '[' + this.id + ']');
    });

})

