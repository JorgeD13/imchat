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
var queryRunner = dataSource.createQueryRunner();

module.exports.addmsg = async (request, response) => {
    // request.body es lo que le paso desde el frontend
    // let msg = request.body;
    // console.log(msg);
    
    await msgRepository.save(request.body)
    .then(function (savedMsg) {
        console.log("Message has been saved: ", savedMsg);
        response.status(200).send("Message added!");
    })
    .catch(function (error) {
        console.log(error);
        response.status(202).send("Erros has ocurred!");
    });
    
};

module.exports.getmsgs = async (request, response) => {
    // var user1 = await request.body.user1;
    // var user2 = await request.body.user2;
    console.log(request.body);

    const sql = `
        select *
        from imchat.message 
        where (user_to = ${request.body.user1} and user_from = ${request.body.user2})
        or (user_to = ${request.body.user2} and user_from = ${request.body.user1})
    `;
    var result = await queryRunner.manager.query(sql);
    // console.log(result);
    return response.status(200).send(result);
};

module.exports.getlastmsg = async (request, response) => {
    let user_id = request.body.user_id;
    const sql = `
        select distinct on (user_util) *,
        case when user_to = ${user_id} then user_from else user_to end as user_util
        from imchat.message
        where user_to = ${user_id}
        or user_from = ${user_id}
        order by user_util, timestamp desc
    `;
    let msgs = await manager.query(sql)
};