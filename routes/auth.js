var router = require('express').Router();
var authModel = require('../models/authModel');
// var jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
     const user = req.body;
     console.log("user....", user)
     authModel.createUser(user, (err, data) => {
      console.log("user***", user);
        if (err) {
            res.json({
                error: true,
                data:  null,
                message: 'Signup failed!'
            })
        } else {
            console.log("data is user", data)
            res.redirect('/auth/signin');
        }
    })
})

router.get('/signup', (req, res) => { 
    res.render('signup');
})

router.get('/signin', (req, res) => { 
    res.render('signin');
})

router.post('/signin', (req, res) => {
//    res.end('Successfully signed in!');
    // console.log('req.body', req.body)
    // res.render('home', req.body);
    const user = req.body;
    console.log("-----data",user)
    authModel.verifyUser(user, (err, data) => {
        if(err){
            res.json({
                error: true,
                data:null,
                message: 'Signin failed!'
            })
           // res.sendStatus(500);
        }else{
            if(data.success) {
                // req.session ={    //req.session.touch is not a function
                //     email: data.email,
                //     role: 'ADMIN'
                // }

                /* using session and cookie
                here updated the session*/
                console.log("data is user", data)
                req.session.email = data.email;
                console.log("req.session.email", req.session.email)
                req.session.id = data.id;
                console.log("req.session.id", req.session.id)
                console.log("data.id", data.id)
                req.session.role = 'ADMIN';
                res.redirect('/home');

                /* using JWT */
                // const token = jwt.sign({
                //     email: data.email,
                //     role: 'ADMIN'
                // }, 'secret')
                // res.json({
                //     success: true,
                //     token
                // })
            }else{
                res.json({
                    error: false,
                    data
                })
            }   
        //   res.redirect('/auth/signin')
        // res.render(home, data)
        }
       
    })  
})

router.post('/signout', (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect('/auth/signin')
}) 

module.exports = router;