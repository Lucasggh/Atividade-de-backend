
## Este repositóri faz parte de uma atividade de aula que fiz 
Neste Projeto, meu Professor entregou um Frontend em html,css e jss e o trabalho era separar em arquivos e criar um backend em node.js e express, além disso criar o banco de dados para fazer uma persistência de dados.
Nisso, criei somente o backend fazendo a conexäo com o fronend e modifiquei as partes necessarias do arquivo JS que fazia parte do frontend.

### Caso quiser testar, o Banco de dados usado é o Mysql, e as o DB é este:             
1) CREATE DATA BASE todo_app;
2) CREATE TABLE task (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL UNIQUE,
  description VARCHAR(500),
  priority ENUM('baixa','media','alta') DEFAULT 'media',
  completed BOOLEAN DEFAULT FALSE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
