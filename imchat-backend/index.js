require("dotenv").config()

const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes")

const app = express();
                    
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);



var typeorm = require("typeorm");
var dataSource = new typeorm.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [require("./models/messageModel")],
})

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