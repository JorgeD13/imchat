require("dotenv").config()

const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

// app.use(cors());
// app.use(cors({origin: 'http://imchat-frontend.s3-website.us-east-2.amazonaws.com'}));

app.use((req,res, next)=>{
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.setHeader('Access-Control-Allow-Headers',"*");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

var typeorm = require("typeorm");
const { getRepository, Column } = require("typeorm");
const socket = require("socket.io");

const spawn = require("child_process").spawn;
const pythonProcess = spawn('python',["./utils/test.py"]);


pythonProcess.stdin.end() 

app.get("/prueba", (req, res) => {
    console.log("here too");
    res.send("HERE!!");
})

const server = app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server started on port ${process.env.PORT || 5000}`);
});

const io = socket(server, {
    cors: {
        origin: "*",
        credentials: true
    }
});

global.onlineUsers = new Map();

io.on("connection", (socket)=>{
    global.chatSocket = socket;

    socket.on("add-user", (userId) => {
        // console.log(userId);
        onlineUsers.set(userId, socket.id);
        console.log("ADD USER");
        console.log(userId);
        // console.log(onlineUsers.get(userId));
    })

    socket.on("send-msg", (data) => {
        // console.log("aqui");
        console.log(data);
        console.log(1);
        const sendUserSocket = onlineUsers.get(data.to);
        console.log(sendUserSocket);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data);
            console.log("ENVIADO");
        } else {
            console.log("EL USUARIO NO EXISTE");
        }
    })
})

