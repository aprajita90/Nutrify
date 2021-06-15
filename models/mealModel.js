var dbClient = require('../db/index')

const createMeal = async (meal, callback) => {
    console.log('meal detail:', meal);
    // const meal = {
    //     datetime:'',
    //     mealName:'',
    //     calories:'',
    //     user_id: ''    //req.session.user_id
    // }
    try{
        const meals = dbClient.get('meals')
        await meals.insert({ date: meal.datetime, mealName: meal.mealName, calories: meal.calorie, description: meal.description })
        callback(null, {
            success: true
        })
    } catch(e) {
        console.log(e)
        callback(e, null)
    }    
}

module.exports.createMeal = createMeal;

const updateMeal = async (meal, callback) => {
    console.log('user detail:', user);
    try{
        const meals = dbClient.get('users.mealObject')
        await meals.updateById({ user_id: meal.user_id, date: meal.datetime, mealName: meal.mealName, calories: meal.calories,  })
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
        const meals = dbClient.get('users.mealObject')
        await meals.removeById({ user_id: meal.user_id  })
        callback(null, {
            success: true
        })
    } catch(e) {
        console.log(e)
        callback(e, null)
    }    
}

module.exports.deleteMeal = deleteMeal;
