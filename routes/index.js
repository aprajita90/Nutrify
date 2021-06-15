var router = require('express').Router();

//common prefix in the main file and all the sub rout move into auth.js 

const authRouter = require('./auth');
const todosRouter = require('./todos');
const adminRouter = require('./admin');
const mealsRouter = require('./meals')

const isAdmin = function (req, res, next) { //access req object and res object next function is cntrol the flow
    // if(req.session && req.session.roles.includes('ADMIN')){
    //     next();
    // }else{
    //     res.sendStatus(401);//403 - forbidden, 401 - Unauthorized
    // }
    // next(); 

    /*this is a session*/
    if(req.session && req.session.role === 'ADMIN'){
        next();
    }else{
        res.sendStatus(401);//403 - forbidden, 401 - Unauthorized
    }

/*JWT*/
    // if(req.userDetails.role === 'ADMIN') {
    //     next();
    // }else{
    //     res.sendStatus(401);
    // }
}
/*JWT*/
// const verifyToken = function (req, res, next) {
//     if (req.headers.authorization) {
//         const token = req.headers.authorization.split(' ')[1]
//         const userDetails = jwt.verify(token, 'secret');
//         console.log('userDetails', userDetails)
//         if(userDetails.email) {
//             req.userDetails = userDetails;
//             next();
//         } else {
//             res.sendStatus(401)
//         }
//     } else {
//         res.sendStatus(401)
//     }
// }

const verifyUser = function(req, res, next) {
    if(req.session.email) {
        next();
    } else {
        res.sendStatus(401)
    }
}

// const isUserAuthorized = function (req, res, next) {
//     if(req.session.user_id === req.params.user_Id) {
        
//     }
// }

router.use('/auth', authRouter);
// router.use('/todos', verifyToken, todosRouter)
// router.use('/admin', verifyToken, isAdmin, adminRouter)
router.use('/todos', verifyUser, todosRouter)
router.use('/admin', verifyUser, isAdmin, adminRouter)
router.use('/meals', mealsRouter )
// router.use('/user_id/meals', verifyUser, mealsRouter )



module.exports = router