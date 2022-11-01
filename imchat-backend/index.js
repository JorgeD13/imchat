require("dotenv").config()

const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes")

const app = express();
                    
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server started on port ${process.env.PORT}`);
});