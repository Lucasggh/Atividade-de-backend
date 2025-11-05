const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require ("cors");

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123",
    database:"todo"
});
db.connect((err) => {
    if(err){
        console.log("Erro ao conectar ao banco:", err);
    } else {
        console.log("Conectado ao banco MySQL!");
    }
});


app.get("/",(req,res)=>{
    res.send("ola")
})


app.listen(3001,()=>{
        console.log("Servidor Ligado!")
})