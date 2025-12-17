const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path');
const uuid = require('uuid');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));


app.set("view endine","ejs");
app.set("views",path.join(__dirname,"/views"))

let randomUser = () => {
    return [
      faker.string.uuid(),
      faker.internet.username(),
      faker.internet.email(),
      faker.internet.password()
    ];
  }

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    database: 'my_db',
    password:'mysql123',
    socketPath: "/tmp/mysql.sock",
  });


//COUNT ROUTE
  app.get('/',(req,res)=>{
    q="SELECT COUNT(*) FROM user";
    connection.query(q, (err, result) => {
        if (err) {
          console.error("FULL ERROR OBJECT:", err);
          res.send("Some Error in DB");
          return;
        }
        let count=result[0]["COUNT(*)"];
        res.render("home.ejs",{count});
      });
  })


//SHOW ROUTE
  app.get('/user',(req,res)=>{
    q="SELECT * FROM user";
    connection.query(q, (err, result) => {
        if (err) {
          console.error("FULL ERROR OBJECT:", err);
          res.send("Some Error in DB");
          return;
        }
        let data=result;
        res.render("user.ejs",{data});
      });
  })



//EDIT ROUTE
  app.get("/user/:id/edit",(req,res)=>{
    let {id}=req.params;
    q=`SELECT * FROM user WHERE id = '${id}'`;

    connection.query(q, (err, result) => {
        if (err) {
          console.error("FULL ERROR OBJECT:", err);
          res.send("Some Error in DB");
          return;
        }
        let data=result[0];
        res.render("edit.ejs",{data});
      });
  })




//UPDATE ROUTE
app.patch("/user/:id",(req,res)=>{
    let {id}=req.params;
    let {password:formPassW,username:newUsername}=req.body;
    q=`SELECT * FROM user WHERE id = '${id}'`;

    connection.query(q, (err, result) => {
        if (err) {
          console.error("FULL ERROR OBJECT:", err);
          res.send("Some Error in DB");
          return;
        }
        let data=result[0];
        if(formPassW!=data.password){
            res.render("wrong.ejs")
        }else{
            let q2=`UPDATE user SET username = '${newUsername}' WHERE id = '${id}'`;
            connection.query(q2, (err, result) => {
                if (err) {
                  console.error("FULL ERROR OBJECT:", err);
                  res.send("Some Error in DB");
                  return;
                }
                res.redirect("/user");
              });

        }


      });
  })



  //DELETE ROUTE
  app.delete("/user/:id",(req,res)=>{
    let {id}=req.params;
    q=`SELECT * FROM user WHERE id = '${id}'`;

    connection.query(q, (err, result) => {
        if (err) {
          console.error("FULL ERROR OBJECT:", err);
          res.send("Some Error in DB");
          return;
        }
        let data=result[0];
        if(id!=data.id){
            res.send("user not found!")
        }else{
            let q2=`DELETE FROM user WHERE id = '${id}'`;
            connection.query(q2, (err, result) => {
                if (err) {
                  console.error("FULL ERROR OBJECT:", err);
                  res.send("Some Error in DB");
                  return;
                }
                res.redirect("/user");
              });
        }
      });
  })





  

  app.listen(8080,()=>{
    console.log("Listining at port 8080");
    
  })



