var router = require('express').Router();

//common prefix in the main file and all the sub rout move into auth.js 

const authRouter = require('./auth');
const adminRouter = require('./admin');
const mealsRouter = require('./meals')

const isAdmin = function (req, res, next) { //access req object and res object next function is cntrol the flo

    /*this is a session*/
    if(req.session && req.session.role === 'ADMIN'){
        next();
    }else{
        console.log("............................")
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
    if(req.session.email && req.session.id) {
        next();
    } else {
        res.sendStatus(401)
    }
}

const isUserAuthorized = function (req, res, next) {
    if(req.session.id === req.params.id) {
        next()
    }else{
        console.log("-----------------------------")
        res.sendStatus(401)
    }
}

router.use('/auth', authRouter);
// router.use('/admin', verifyToken, isAdmin, adminRouter)
router.use('/admin', verifyUser, isAdmin, adminRouter)
router.use('/meals', mealsRouter )
router.use('/admin', isUserAuthorized,isAdmin, mealsRouter )



module.exports = router