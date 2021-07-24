var router = require('express').Router();
var mealModel = require('../models/mealModel');
// var dbClient = require('../db/index')
// var  dbMeals = dbClient.get('meals')
// var jwt = require('jsonwebtoken');

router.get('/', function(req, res) {
  res.render('deshboard');
});

router.get('/get-data', (req, res)=>{
    // const meals = req.body;
    var data= req.body.find({});
    console.log("data", data)
    data.on('success', function(docs) {
        res.render('deshboard', {meals: docs})
    });
});

router.post('/insert', (req, res) => {
    // res.end('Successfully signed up!');
     const meal = req.body;
     console.log("meal....", req.body)
     console.log("meal....", meal)
     mealModel.createMeal(meal, (err, data) => {
       console.log("meal***", meal);
        if (err) {
            console.log("-----", err)
            res.json({
                error: true,
                data:  null,
                message: 'insert failed!'
            })  
        } else {
            console.log("data meals", data)
            
            res.redirect('/deshboard')
        }
    })
})

router.post('/update', (req, res) => {
    // res.end('Successfully signed up!');
    //const id=req.params.id
    //onsole.log(req.params.id)
     const meal = req.body;
     var id = req.body._id
     console.log("meal....", meal)
    //  mealModel.findByIdAndUpdate(id,meal, (err, data) => {
        mealModel.updateById(id,meal, (err, data) => {
       // console.log("user....", user);
        if (err) {
            res.json({
                error: true,
                data:  null,
                message: 'update failed!'
            })
        } else {
            console.log("data", data)
            res.send("data")
            message: 'updated!'
        }
    })
})

// router.delete('/delete/:id', (req, res) => {
//     // res.end('Successfully signed up!');
//     const _id=req.params.id
//      const meal = req.body;
//      console.log("meal....", meal)
//      mealModel.findByIdAndDelete(id, (err, data) => {
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
//             res.send(data)
//         }
//     })
// })

router.post('/updateMeal', (req, res) => {
    // req.session.destroy();
    // res.clearCookie('connect.sid');
    res.redirect('/meals/updateMeal')
}) 

router.post('/deleteMeal', (req, res) => {
    // req.session.destroy();
    // res.clearCookie('connect.sid');
    res.redirect('/meals/delete')
}) 
module.exports = router;