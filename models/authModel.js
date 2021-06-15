var dbClient = require('../db/index')
var passwordHash = require('password-hash');

const createUser = async (user, callback) => {
    //console.log('user detail:', user);
    try{
        const users = dbClient.get('users')
        await users.insert({ 
                firstname: user.firstname,
                lastname: user.lastname,
                maxcaloriesperday: user.maxcaloriesperday,
                username: user.username,
                email: user.email, 
                password: passwordHash.generate(user.password) 
            })
        callback(null, {
            success: true
        })
    } catch(e) {
        console.log(e)
        callback(e, null)
    }    
}

module.exports.createUser = createUser;

const verifyUser = async (user, callback) => {
    const {email, password} = user;
    //console.log('user detail', user);
    try{
        const users = dbClient.get('users')
        const dbUser = await users.findOne({ 
            email: user.email 
        })
        if(dbUser){
            const isPasswordVerified = passwordHash.verify(password, dbUser.password)
            if(isPasswordVerified) {
            callback(null, {
                success: true,
                email
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

module.exports.verifyUser = verifyUser