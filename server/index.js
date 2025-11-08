const express = require("express");
const app = express();
const mysql2 = require("mysql2");
const cors = require ("cors");
const dotenv = require("dotenv")
dotenv.config()
console.log("carregado env")
app.use(cors());
app.use(express.json())

function formatDateForMySQL(dateString) {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

const db = mysql2.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    port:parseInt(process.env.DB_PORT,10)
});



app.get("/",(req,res)=>{
    res.json({status:200})
})

app.get("/pegarTask",(req,res)=>{
    db.query('SELECT * FROM task',(err,result)=>{
        if(err){
            res.status(500).json({mensagem:"Erro no servidor", erro:err})}
        else{
            res.status(200).json({mensagem:"Tarefas buscadas com sucesso", tarefas:result})
        }
    })
})

app.post("/create",(req,res)=>{
    const title = req.body.title
    const description = req.body.description
    const priority = req.body.priority
    const completed = req.body.completed
    const createdAt = formatDateForMySQL(req.body.createdAt);

    db.query('INSERT INTO task (title,description,priority,completed,createdAt) VALUES (?,?,?,?,?)',[title,description,priority,completed,createdAt],(err,result)=>{
        if(err){
            res.status(500).json({mensagem:"Erro no servidor", erro:err})
            console.log("erro no servidor",err)
        }

        else{
            res.status(201).json({mensagem:"Tarefa criada com sucesso", taskid:result.insertId})
        }
    } )
})

app.put("/atualizar/:id", (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;
    const completed = req.body.completed;
    const createdAt = req.body.createdAt;
    const id = req.params.id;

    db.query(
        "UPDATE task SET title=?, description=?, priority=?, completed=?, createdAt=? WHERE id=?",
        [title, description, priority, completed, createdAt, id],
        (err, result) => {
            if (err) {
                res.status(500).json({ mensagem: "Erro no servidor, verifique a resposta", erro: err });
            } else if (result.affectedRows === 0) {
                res.status(404).json({ mensagem: "Erro ao tentar encontrar a tarefa, verifique resultado", affectedRows: result.affectedRows });
            } else {
                res.status(200).json({ mensagem: "task atualizada com sucesso", taskid: id });
            }
        }
    );
})

app.listen(parseInt(process.env.PORT),()=>{
    console.log("servidor rodando")
})

