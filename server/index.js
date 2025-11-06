const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require ("cors");

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"Lucasggh12344@",
    database:"todo_app",
    port: 3300
});
db.connect((err) => {
    if(err){
        console.log("Erro ao conectar ao banco:", err);
    } else {
        console.log("Conectado ao banco MySQL!");
    }
});


app.get("/",(req,res)=>{
    res.json({status:200})
})

app.get("/pegarTask",(req,res)=>{
    db.query('SELECT * FROM task',(err,result)=>{
        if(err){
            res.status(500).json({message:"Erro no servidor", erro:err})}
        else{
            res.status(200).json({message:"Tarefas buscadas com sucesso", tarefas:result})
        }
    })
})

app.post("/create",(req,res)=>{
    const title = req.body.title
    const description = req.body.description
    const priority = req.body.priority
    const completed = req.body.completed
    const completedAt = req.body.completedAt
    db.query('INSERT INTO task (title,description,priority,completed,createdAt) VALUES (?,?,?,?,?)',[title,description,priority,completed,completedAt],(err,result)=>{
        if(err){
            res.status(500).json({message:"Erro no servidor", erro:err})}
        else{
            res.status(201).json({message:"Tarefa criada com sucesso", taskid:result.insertId})
        }
    } )
})

app.listen(3001,()=>{
        console.log("Servidor Ligado!")
})

