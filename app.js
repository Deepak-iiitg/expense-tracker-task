const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const server = express();
server.use(express.json());
server.use(bodyParser.urlencoded());
server.use(cors());
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Deepak@1234",
    database:"products"
})
server.get('/',(req,res)=>{
    res.send({
        message:"get succussfully"
    })
})

server.post('/product',async (req,res)=>{
    console.log(req.body);
    const expense = req.body.expense;
    const product = req.body.product;
    const price = req.body.price;
    conn.connect((err)=>{
        if(err){
            throw err;
        }
        
        let sql = 'insert into eccom(type,name,price) values ?';
        let values = [[expense,product,price]];
        conn.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });
        
    })
    
    res.send({
        data:req.body
    })
})

server.get('/product',(req,res)=>{
    conn.connect(function(err) {
        if (err) throw err;
        conn.query("SELECT * FROM eccom", function (err, result, fields) {
          if (err) throw err;
          res.send(result);
        });
    });
})
server.post('/delete',(req,res)=>{
    console.log(req.body.name);
    const id = req.body.id;
    conn.connect(function(err) {
        if (err) throw err;
        const sql = 'delete from eccom where id = ?';
        // const name = [];
        // name.push(req.body.name);
        conn.query(sql,[id], function (err, result, fields) {
          if (err) throw err;
          res.send(req.body);
        });
    });
})
server.post('/update',(req,res)=>{
    const type = req.body.expense;
    const name = req.body.product;
    const price = req.body.price;
    const id = req.body.id;
    console.log(type,name,price,id);
    conn.connect(function(err) {
        if (err) throw err;
        const sql = 'update eccom set type=?,name=?, price=? where id=?';
        // const name = [];
        // name.push(req.body.name);
        conn.query(sql,[type,name,price,id], function (err, result, fields) {
          if (err) throw err;
          res.send(req.body);
        });
    });
})
server.listen(8080,()=>{
    console.log('server started');
})