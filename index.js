const express = require('express')
const app = express() 
const http = require('http').createServer(app) //서로 소통? 양방향의 소통을 위한
const io = require('socket.io')(http, {cors:{origin:"*"}}) //각자 접속했을 때 각자의 정보를 갖기위한
const cors = require('cors')
const { Socket } = require('dgram')

let userInfo = []


// app.use(cors()) 

// app.get('/send/:msg', (req, res)=>{

//   const msg = req.params.msg
//   console.log(msg)
//   res.send(msg)
// }) 

io.on('connection', (socket)=> {
  console.log("user connected")

  socket.on('disconnect', ()=>{

    const nickName = userInfo.find(c=>c. id == socket.id).input_ref
    console.log("user disconnect")
    socket.broadcast.emit('msg',{level:"sys", msg:nickName+"님이 퇴장하셨습니다."})
  })

  socket.on('login', (input_ref)=>{
    const info = {
      input_ref:input_ref,
      id:socket.id
    }
    userInfo.push(info)
    io.emit('msg',{level:"sys", msg:input_ref+"님이 입장하셨습니다."})
  })

  socket.on('send', (msg1)=>{
    // io.emit('msg',{msg:msg1})
    socket.broadcast.emit('msg',{level:"", msg:msg1})
  })
})

http.listen(process.env.PORT || 3002, ()=>{ 
  console.log("connected on server port 3002")
})