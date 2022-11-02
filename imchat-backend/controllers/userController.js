const { response } = require("express");
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SID } = process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
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
    entities: [require("./../models/User")],
})

dataSource.initialize();
var userRepository = dataSource.getRepository("User")

module.exports.register = async (request, response, next) => {
    await userRepository.save(request.body)
    .then(function (savedUser) {
        console.log("User has been saved: ", savedUser)
    })
    .catch(function (error) {
        console.log(error)
    })
    response.status(201).send("User added!")
};

module.exports.login = async (request, response, next) => {
  const user = await userRepository.findOne({
    where: {
      username: request.body.username,
      password: request.body.password
    }
  })
  .catch(function (error) {
    console.log(error)
  })
  response.status(200).json(user); // borrar
  // console.log(user);
  // delete user['id'];
  // delete user['public_key'];
  // delete user['password'];
  // console.log(user); 
  //response.status(200).json(user);
  /* if (user) {
    try {
      await client.verify.services(TWILIO_VERIFY_SID)
      .verifications
      .create({
        to : `+51${user.phone}`,
        channel: `sms`
      })
      .then(data => {
        console.log(user.username);
        delete user['id'];
        delete user['public_key'];
        delete user['password'];
        console.log(user);
        response.status(200).json(user);
      })
    } catch (error) {
      console.log(error);
      return response.status(202).send("CANT SEND A MESSAGE!?!?!?!?!?!??!?!?!?!?!?");
    }
  } else {
    response.status(202).send("NO USER FOUND");
  } */
};

module.exports.verify = async (request, response, next) => {
  console.log(request.body);
  return response.status(200).send({
    message: "User is Verified!!!!!!!!!"
}); // borrar
  if (request.body.phone && (request.body.code).length === 6) {
    await client
    .verify
    .services(process.env.TWILIO_VERIFY_SID)
    .verificationChecks
    .create({
        to: `+51${request.body.phone}`,
        code: request.body.code
    })
    .then(data => {
        if (data.status === "approved") {
            return response.status(200).send({
                message: "User is Verified!!!!!!!!!"
            });
        }
    })
  }
  else return response.status(202).send("No se pudo verificar el codigo");
}
