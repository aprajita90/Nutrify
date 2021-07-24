var dbClient = require('../db/index')

const createMeal = async (meal, callback) => {
    console.log('meal detail:', meal);
    // const meal = {
    //     datetime:'',
    //     mealName:'',
    //     calories:'',
    //     user_id: req.session.id
    // }
    try{
        const meals = dbClient.get('meals')
        await meals.insert({ 
                date: meal.date, 
                mealName: meal.mealName,  
                description: meal.description,
                user_id:meal.user_id,
                calorie: meal.calorie
            })
        callback(null, {
            success: true
        })
    } catch(e) {
        console.log(e)
        callback(e, null)
    }    
}
// const createMeal = (req, res) => {
//     const {mealDate, mealType, mealDescription, mealCalories} = req.body;
//     const id = req.session.userId;
//     userModel.findOne({_id:id},(err)=>{
//         if(err){
//             console.log(err);
//         }
//     }).then(user=>{
//         let meals = user.meals;
//         meals.push({mealDate,mealType,mealDescription,mealCalories});
//         userModel.updateOne({_id:id},{
//             $push: {
//                 meals:{
//                     mealDate,mealType,mealDescription,mealCalories
//                 }
//             }
//         },(err)=>{
//             if(err){
//                 console.log(err);
//             }
//         });
//         req.session.meals = meals;
//         if(req.session.admin==true){
//             res.redirect('/adminDashboard')
//         }
//         else{
//             res.redirect('/dashboard');
//         }
//     });
// };
module.exports.createMeal = createMeal;

const isUserAuthorized = async (user, callback) => {
    const {user_id} = meal;
    console.log('user detail', meal);
    try{
        const meals = dbClient.get('meals')
        console.log("meals of verifie----", meals)
        const dbMeals = await meals.findOne({ 
            id: meal.user_id
        })
        console.log("meals----", dbMeals.user_id)
        if(dbMeals){
            const isMealsUser_id = dbMeals.user_id
            if(isMealsUser_id) {
            callback(null, {
                success: true,
                date: dbMeals.date, 
                mealName: dbMeals.mealName,  
                description: dbMeals.description,
                user_id:user_id,
                calorie: dbMeals.calorie
            }) 
            }else{
                callback(null, {
                    success: false,
                    message: 'Please check your passsword!'
                })
            }
        }else {
            callback(null, {
                success: false,
                message: 'No user found. Please sign up'
            })
        }
        
    } catch(e) {
        console.log(e)
        callback(e, null)
    }    
}

module.exports.isUserAuthorized = isUserAuthorized

const updateMeal = async (meal, callback) => {
    console.log('user detail:', user);
    try{
        const meals = dbClient.get('meal')
        await meals.updateById({ 
            date: meal.datetime, 
            mealName: meal.mealName, 
            calories: meal.calorie, 
            description: meal.description, 
            // user_id:req.session.id 
        })
        callback(null, {
            success: true
        })
    } catch(e) {
        console.log(e)
        callback(e, null)
    }    
}

module.exports.updateMeal = updateMeal;

const deleteMeal = async (meal, callback) => {
    console.log('user detail:', user);
    try{
        const meals = dbClient.get('meal')
        await meals.removeById({ user_id:req.session._id  })
        callback(null, {
            success: true
        })
    } catch(e) {
        console.log(e)
        callback(e, null)
    }    
}

module.exports.deleteMeal = deleteMeal;
