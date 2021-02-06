const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.resolve(__dirname, "./db/messages.sqlite3");
const db = new sqlite3.Database(dbPath);

const userPath = path.resolve(__dirname, "./db/users.sqlite3");
const userdb = new sqlite3.Database(userPath);

const passport = require('passport')
const bcrypt = require("bcrypt");
const initializePassport = require('./passport-config')
const flash = require('express-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')

app.use(morgan())




const PORT = process.env.PORT || 3001

app.use(express.static('public')); //'public' folder contains js, css, images

app.use(cors({
    origin:"http://localhost:3000", //<-location of react app we're connecting to
    credentials: true
}));
app.use(express.json());




app.use((req,res,next)=>{
    console.log(`Request!!`)
    next();
})





//Getting Data From SQL Database
app.get('/testing', (req,res,next)=>{
    console.log('TEST REQUEST')
    db.all('SELECT * FROM randomData', (err, data)=>{
        console.log(data)
    })

    res.send({test: "Data blah blah"})
})

//Logging  In Portion
function checkIfUserExists(req, res,next){
    console.log('Checking if User Exist')
    console.log(req.body)
  
    userdb.all(
      `SELECT * from LogIn WHERE Username = '${req.body.username}' OR email = '${req.body.email}';`,
      (err, user) => {
        if(err){
          next(err)
        }
        console.log(user)
        if(user.length >0  ){
          return res.send('Username or Email Already Exists')
        }else{
          next()
        }
      })
  }
  
  
  
  app.use(flash())
  app.use(session({
    secret: 'secret', 
    resave :true,
    saveUninitialized: true, 
    //cookie: {secure:true}
  }))
  app.use(cookieParser(process.env.REACT_APP_SESSION_SECRET))
  app.use(passport.initialize())
  app.use(passport.session())
  initializePassport(passport)
  
  
  
  //Routes

  
  
  
  app.post('/login', (req, res,next)=>{
      console.log('Login')
    passport.authenticate("local", (err, user, info)=>{
      if(err){
        next(err)
      }else{
        if(!user) res.send("No User Exists");
        else{
          req.logIn(user, err =>{
            if(err) throw err;
            console.log(req.user, 'req.user')
            res.send({user: user.Username})
           
          })
        }
      }
    })(req, res, next);
  })
  
  
  
  app.get('/users', (req, res,next)=>{
    console.log('GET REQUEST OF LOGGED IN USER')
    console.log(req.user)
    if(req.user){
      console.log(req.user.Username)
      res.send({user:req.user.Username})
    }else{
      res.send(false)
    }
  
  })












app.listen(PORT, ()=>{
    console.log(`Listening on Port ${PORT}`)
})

//Used for Testing Server
module.exports = app;