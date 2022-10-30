const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes")

const app = express();
require("dotenv").config();

const db = require("./queries")


/* client.query(`Select * from imchat.user`, (err, res)=>{
    if (!err) console.log(res.rows);
    else console.log(err.message);
    client.end;
}) */


app.use(cors());
app.use(express.json());

// app.use("/api/auth", userRoutes);

app.post('/api/auth/register', db.createUser);

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server started on port ${process.env.PORT}`);
});