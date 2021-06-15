var express = require('express');
var app = express();
// var jwt = require('jsonwebtoken');



/*
quering string and submitted
get request pass the param
post request pass the payload

express provide lots of mutiple midelware. two such a middelware 
1) express.json()
2) express.urlencoded
*/

//Using sessions and cookie
var session = require('express-session')
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized:false,
    cookie:{ secure: false }
}))



app.use(express.json()); //payload
app.use(express.urlencoded({extended: false})) //params
app.use('/static', express.static('../public'));
// app.use(express.static('frontend/build'))

/*//app.use(express.static('files')) // you can use multiple static file*/

//middlewares is a function which have access to req and res objects and the next function in the request-response cycle.
//i.e custom middleware
//middlewares use application level and router level
const Logger = function (req, rs, next) {
    req.requestTime = new Date();
    console.log(`[${new Date()}]: ${req.method} ${req.url}`);
    next();
}

app.use(Logger);


// const isAdmin = function (req, res, next) { //access req object and res object next function is cntrol the flow
//     // if(req.session && req.session.roles.includes('ADMIN')){
//     //     next();
//     // }else{
//     //     res.sendStatus(401);//403 - forbidden, 401 - Unauthorized
//     // }
//     next(); 
// }

app.set('views', __dirname + '/views');
// app.set('views', '../views');
console.log('views', __dirname + '/views')
app.set('view engine', 'ejs');

// //common prefix in the main file and all the sub rout move into auth.js 

// const authRouter = require('../routes/auth');
// const todosRouter = require('../routes/todos');
// const adminRouter = require('../routes/admin');

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
    if(req.session.email) {
        res.render('home', { email: req.session.email })
    } else {
        res.sendStatus(401);
    }
})

app.use(indexRouter)


// app.use('/auth', authRouter);
// app.use('/todos', todosRouter)
// app.use('/admin', isAdmin, adminRouter)

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