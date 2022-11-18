require("dotenv").config()

const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
 
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

var typeorm = require("typeorm");
const { getRepository } = require("typeorm");
const socket = require("socket.io");

//

/* (async () => {
    var dataSource = new typeorm.DataSource({
        type: "postgres",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        entities: [require("./models/userModel")],
    })
    const d = await dataSource.initialize();
    const queryRunner = await d.createQueryRunner();

    let user_id = 1//request.body.user_id;
    const sql = `
        select username, public_key, user_from, content
        from imchat.user u
        left join (
            select distinct on (user_util) *, case when user_to = ${user_id} then user_from else user_to end as user_util
            from imchat.message
            where user_to = ${user_id}
            or user_from = ${user_id}
            order by user_util, timestamp desc
        ) m
        on u.id = m.user_util
        where u.id != 1
    `
    var result = await queryRunner.manager.query(sql);

    // var msgRepository = await d.getRepository("Message")
    console.log(result); 
})() */

/* dataSource
    .initialize()
    .then(function () {
        var msg = {
            user_to: 1,
            user_from: 2,
            content: "aaa",
            timestamp: fecha.toISOString()
        }

        var msgRepository = dataSource.getRepository("Message")
        msgRepository
            .save(msg)
            .then(function (savedMsg) {
                console.log("Message has been saved: ", savedMsg)
                console.log("Now lets load all messages: ")

                return msgRepository.find()
            })
            .then(function (allMsgs) {
                console.log("All messages: ", allMsgs)
            })
    })
    .catch(function (error) {
        console.log("Error: ", error)
    }) */


// `insert into times (time) values (to_timestamp(${Date.now()} / 1000.0))`

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server started on port ${process.env.PORT}`);
});

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
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
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data);
            console.log("ENVIADO");
        } else {
            console.log("EL USUARIO NO EXISTE");
        }
    })
})
