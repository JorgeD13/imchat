const { response } = require("express");
var typeorm = require("typeorm");
const bcrypt = require("bcrypt");

var dataSource = new typeorm.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [require("./../models/messageModel")],
})

dataSource.initialize();
var msgRepository = dataSource.getRepository("Message")

module.exports.addmsg = async (request, response) => {
    // request.body es lo que le paso desde el frontend
    let msg = request.body;
    console.log(msg);
    

    /*
    await msgRepository.save(request.body)
    .then(function (savedMsg) {
        console.log("Message has been saved: ", savedMsg)
    })
    .catch(function (error) {
        console.log(error)
    })
    response.status(201).send("Message added!")
    */
};

module.exports.getmsg = async (request, response) => {
    return response.status(200).send(msgRepository.find({
        where: [
            {
                user_to: request.body.user1,
                user_from: request.body.user2
            },
            {
                user_to: request.body.user2,
                user_from: request.body.user1
            },
        ],
        order: {timestamp: "ASC"}
    }));
};
