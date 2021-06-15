var router = require('express').Router();
var mealModel = require('../models/mealModel');
// var jwt = require('jsonwebtoken');

router.get('/get-data', (req, res)=>{
    var data= mealModel.mealObject.find({});
    data.on('success', (doc) => {
        res.render('index', doc)
    })
})

router.post('/insert', (req, res) => {
    // res.end('Successfully signed up!');
     const user = req.body;
     console.log("user....", user)
     mealModel.createMeal(user, (err, data) => {
       // console.log("user....", user);
        if (err) {
            res.json({
                error: true,
                data:  null,
                message: 'insert failed!'
            })
        } else {
            console.log("data", data)
            res.redirect('/update');
            message: 'success insert'
        }
    })
})

// router.post('/update', (req, res) => {
//     // res.end('Successfully signed up!');
//      const user = req.body;
//      console.log("user....", user)
//      mealModel.updateMeal(user, (err, data) => {
//        // console.log("user....", user);
//         if (err) {
//             res.json({
//                 error: true,
//                 data:  null,
//                 message: 'update failed!'
//             })
//         } else {
//             console.log("data", data)
//             message: 'updated!'
//         }
//     })
// })

// router.post('/delete', (req, res) => {
//     // res.end('Successfully signed up!');
//      const user = req.body;
//      console.log("user....", user)
//      mealModel.updateMeal(user, (err, data) => {
//        // console.log("user....", user);
//         if (err) {
//             res.json({
//                 error: true,
//                 data:  null,
//                 message: 'delete failed!'
//             })
//         } else {
//             console.log("data", data)
//             message: 'deleted!'
//         }
//     })
//})
module.exports = router;