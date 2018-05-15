const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../../config/database");

//User Model
const User = require("../../server/user/user.model");

//REGISTER ROUTE
router.post("/register", (req, res, next)=>{
    let newUser = new User({
        name:req.body.name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
    });


    User.checkExistUser(newUser.username, (err, user)=>{
        if(user.length > 0){
            res.json({success:false, msg: '"'+user[0].username+'"'+" user name already exist"});
        }
        else{
            User.addUser(newUser, (err, user)=>{
                if(err){
                    res.json({success:false, msg:"Faild to register user"});
                }else{
                    res.json({success:true, msg:"User Registered"});
                }
            });
        }
    })
    
});
/*
router.get("/register", (req, res, next)=>{
    User.getUsers(res)
});
*/
//AUTHENTICATE ROUTE
router.post("/authenticate", (req, res, next)=>{
    const username = req.body.username,
    password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;

        if(!user){
            return res.json({success:false, msg:"User not found"});
        }
        
        User.comparePassword(password, user.password, (err, isMatch) =>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user, config.secret, {
                    expiresIn:45554  //1 week
                });
                res.json({
                    success:true,
                    token:"JWT "+token,
                    user: {
                        id:user.id,
                        name:user.name,
                        username:user.username,
                        email:user.email
                    }
                })
            }else{
                return res.json({success:false, msg:"Wrong Password"});
            };
        })
    })
});



router.get("/profile", passport.authenticate("jwt", {session:false}), (req, res, next)=>{
     res.json({user:req.user})
});

router.get("/permission", passport.authenticate("jwt", {session:false}), (req, res, next)=>{
    res.json({'permission':req.user.permission})
});

module.exports = router; 