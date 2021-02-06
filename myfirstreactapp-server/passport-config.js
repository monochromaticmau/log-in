const LocalStrategy = require("passport-local").Strategy;
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.resolve(__dirname, "./db/users.sqlite3");
const db = new sqlite3.Database(dbPath);
const bcrypt = require("bcrypt");

 function initialize(passport) {
  passport.use(
     new LocalStrategy( (username, password, done) => {
      db.get(
        `SELECT * from LogIn WHERE Username = '${username}';`,
        async (err, user) => {
        
            try{
                console.log('User in passport-config.js')
                console.log(user);
                if (err) {
                  next(err);
                } else {
                  // If User Doesn't Exist in system
                  if (!user) {
                    return done(null, false);
                  } else {
                  //  User exitst in System, lets check password
                  console.log(password)
                  console.log(user.HashedPassword)
                     await bcrypt.compare(password, user.HashedPassword,
                      (err, result) => {
                        if (err) {
                            console.log('errror here?')
                            console.log(err)
                            throw err
                        } else {
                          //If Password Matches return no error and user information
                          console.log(result)
                          if (result === true) {
                            return done(null, user);
                          } else {
                          // If Password does not match return no error and false
                            return done(null, false);
                          }
                        }
                      });
                  }
                }

            }catch(e){
                throw e

            }
   
        }
      );
    })
  );
  //Stores a cookie inside of browswer
  passport.serializeUser((user, cb) => { 
      console.log(user, 'serialize user')
      cb(null, user.id)});

  passport.deserializeUser((id, cb) => { 
    console.log('deserializtion begin')
    db.get(
        `SELECT * from LogIn WHERE id = '${id}';`,
        (err, user) => {
            console.log(user, 'deserializeuser')
            cb(err, user);
        })

  });
}

module.exports = initialize;
