# 基于Web的多人在线聊天室

一个每天进步的前端小白，分享一个在去年暑假刚入门前端不久写过小项目：基于Web的多人在线聊天室。

在此简单分享一下开发方案与源代码。

都在学习，如有错误，多多包涵。

## 需求分析

因为当时作为前端小白，只是拿这个小项目练手，到现在也没有维护过，所以功能不丰富，有部分功能页面中有，但实际还未实现。读者可自行完善实现。以下为已经实现的功能：

- 可注册，登录，更换用户头像
- 群聊功能，可使用简单的emoji表情
- 创建房间

## 开发方案

- 后端服务器部分：

  Nodejs

- 前端部分：

  HTML5 + CSS3 +JS

- 前后端数据交互：

  Socket.io（Websocket）

- 相关框架：

  前端： JQuery + Bootstarp

  后端： Express

- 数据库：

  Mysql

- 软件环境：

  Visual Studio Code + Nodejs + 支持HTML5的浏览器

## 项目分析

#### 1. 服务器端搭建：

本服务器需要提供两个功能：http服务和websocket服务，由于node的事件驱动机制，可将两种服务搭建在同一个端口下。

- Http服务器    静态文件服务器 （server.js文件）

  http服务器主要是给web浏览器提供静态文件，即浏览器发来一个请求。服务器返回一个响应。

- Socket.io服务器  （chat_server.js文件）

  socket.io提供开箱即用的虚拟通道，所以不需要任务手动转发信息到已连接的用户。

#### 2. 客户端实现：

- 创建HTML和CSS

- 实现Socket.io

  chat.js：向服务器发送用户想信息和昵称，以及变更昵称和房间的请求

  chat_ui.js：处理用户输入，根据输入调用chat.js的不同方法发送消息给服务器

  init.js：客户端程序初始化，创建一个websocket连接，绑定事件

## 项目展示

这里我在本地用两个浏览器来模拟两个人在线聊天的过程：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211121051572.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211121108330.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211121201102.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200211121212895.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjEyNDIxNA==,size_16,color_FFFFFF,t_70)

## 源代码分享

源代码我放在我的github，附上链接，需要自提。

GitHub链接：[link](https://github.com/Lin-Tui/WebChat)
