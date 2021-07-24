var router = require('express').Router();

router.get('/users', (req, res) => {
    res.json({
        users:[]
    })
})
router.get('/meals', (req, res) => {
    res.json({
        meals:[]
    })
})

module.exports = router;