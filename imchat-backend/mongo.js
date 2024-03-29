const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const memberSchema = new Schema({
    firstName: String,
    lastName: String
});
const Member = mongoose.model("member", memberSchema);

mongoose.connect("mongodb://localhost:27017/?authMechanism=DEFAULT", { useNewUrlParser: true });
const http = require('http');
http.createServer((req, res) => {
    Member.find({}, "firstName lastName").then(members => {
        if (members !== null && members.length > 0) {
            res.write(JSON.stringify(members));
        } else {
            res.write("No members found");
        }
        res.end();
    });
}).listen(8000);