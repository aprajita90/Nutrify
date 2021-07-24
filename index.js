var express = require('express');
var app = express();
// var jwt = require('jsonwebtoken');


//Using sessions and cookie
var session = require('express-session')
console.log(session)
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized:false,
    cookie:{ secure: false }
}))



app.use(express.json()); //payload
app.use(express.urlencoded({extended: false})) //params
app.use('/static', express.static('../public'));

const Logger = function (req, rs, next) {
    req.requestTime = new Date();
    console.log(`[${new Date()}]: ${req.method} ${req.url}`);
    next();
}

app.use(Logger);

app.set('views', __dirname + '/views');
// app.set('views', '../views');
// console.log('views', __dirname + '/views')
app.set('view engine', 'ejs');

const indexRouter = require('./routes/index')


/*server side rendering code*/

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html');
    // // console.log(__dirname + '/index.html')
    res.render('main');
})

// Using jwt - how do achive the session
// app.get('/home', (req, res) => {
//     console.log(req.headers);
//     if (req.headers.authorization) {
//         const token = req.headers.authorization.split(' ')[1]
//         const userDetails = jwt.verify(token, 'secret');
//         console.log('userDetails', userDetails)
//         if(userDetails.email) {
//             res.render('home', { email: userDetails.email })
//         } else {
//             res.sendStatus(401)
//         }
//     } else {
//         res.sendStatus(401)
//     }
// })

//Using sessions and cookie - how do achive the session
app.get('/home', (req, res) => {
    console.log('session', req.session)
    if(req.session.email && req.session.id) {
        console.log(req.session.email)
        console.log(req.session.id)
        res.render('home', { 
            email: req.session.email,
            id: req.session.id
        })
    } else {
        res.sendStatus(401);
    }
})
app.get('/deshboard', (req, res) => {
    console.log('session of meals', req.session)
    if(req.session) {
        res.render('deshboard', { 
            date:req.session.date,
            mealName: req.session.mealName,
            description:req.session.description,
            id: req.session.id,
            calories: req.session.calories
           // console.log(req.session.id)
            // console.log("meals", req.body)
        })
    } else {
        res.sendStatus(401);
    }
})

app.use(indexRouter)

app.listen(3000, () => {
    console.log('Server Listening on port 3000')
})

app.use(function(err, req, res, next) {    //error missleware
    if(err){
        console.log(err)
        res.sendStatus(500);
    }else{
        next();
    }
})