var curIndex = 0;
//时间间隔(单位毫秒)，每秒钟显示一张，数组共有3张图片放在img文件夹下
var timeInterval = 5000;
var pictureIndex0 = 1;
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

$(document).ready(function () {
  $('#loginButton').hide();
  $("#regButton").click(function () {
    $("#login").attr('action', '/register');
    $("#usr").attr('placeholder', '请输入用户名');
    $("#pwd").attr('placeholder', '请输入密码');
    $(".but").html('注册');
    $('#regButton').hide();
    $('#loginButton').show();
  });

  $("#loginButton").click(function () {
    $("#login").attr('action', '/login');
    $("#usr").attr('placeholder', '用户名');
    $("#pwd").attr('placeholder', '密码');
    $(".but").html('登录');
    $('#loginButton').hide();
    $('#regButton').show();
  });

  //选择头像
  $('#HeadPortrait').on('click', function () {
    if ($('.ChangeHeadPortrait').css('display') == 'none') {
      $(".ChangeHeadPortrait").css('display', 'block');
      for(i=0;i<12;i++){
        var id0 = '#'+i
        $(id0).css("border-style", "none");}

    } else {
      $(".ChangeHeadPortrait").css('display', 'none');

      }

  });

  $('.ChangeHeadPortrait').delegate("img", "click", function (event) {
    var target = $(event.target);
      $('.Portrait:not(target)').css("border-style", "none");
        $(this).css("border-style", "solid");
        pictureIndex0 = target.attr('id');
        $('#HeadPortrait').attr('src','images/Head'+pictureIndex0+'.png');
        $('#picid').val(pictureIndex0);
  });
  


  //以下为检验注册用户名是否存在
  function checkAccount() {
    if ($("#usr").attr('placeholder') === '用户名') {
      return;
    }
    var data = new Object();
    data.username = $('#usr').val();
    data.pictureIndex = pictureIndex0;
    var htmlobj1 = $.ajax({
      url: "/checkUsername",
      data: data,
      method: 'POST',
      async: false
    });

    if (htmlobj1.responseText === '0') {
      $('#loginButton').hide();
      $('#loginButton').hide();
      $('#tip1').css('color','#00CD00');
      $('#tip1').html('用户名可用');

    } else {
      $('#loginButton').hide();
      $('#loginButton').hide();
      $('#color').css('color','red');
      $('#tip1').html('用户名存在')
    }
  }

  $("#usr").on('blur', checkAccount);


  //用户名不存在注册用户
  function addUser() {
    if ($("#usr").attr('placeholder') === '用户名') {
      return;
    }

    var data = new Object();
    data.username = $('#usr').val();
    data.password = $('#pwd').val();
    data.pictureIndex = pictureIndex0;

    var htmlobj2 = $.ajax({
      url: "/register",
      data: data,
      method: 'POST',
      success: function () {
        console.log(JSON.stringify(htmlobj2));
        if (htmlobj2.responseText === '0') {
          alert('注册成功，可登入账号！');
          window.location.href = 'http://127.0.0.1:3000/';
        } else {
          alert('注册失败，请重新注册！');
          window.location.href = 'http://127.0.0.1:3000/';
        }
      }

    });


  }
  $('.but').on('click', addUser);


  //用户登录时检验密码，正确后跳转页面
  function checkPassword() {
    if ($("#usr").attr('placeholder') === '请输入用户名') {
      return;
    }
    var data = new Object();
    data.username = $('#usr').val();
    data.password = $('#pwd').val();
    data.pictureIndex = pictureIndex0;
    var htmlobj3 = $.ajax({
      url: "/login",
      data: data,
      method: 'POST',
      success: function () {
        if (htmlobj3.responseText === '0') {
          alert('账号或密码错误，请重新输入！');
          window.location.href = 'http://127.0.0.1:3000/';

        } else {
          window.location.href = 'http://127.0.0.1:3000/chatHomePage';
        }
      }

    });
  }
  $('.but').on('click', checkPassword);

});





