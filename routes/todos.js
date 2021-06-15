var router = require('express').Router();

router.post('/new', (req, res) => {
    console.log('session', req.session);
    res.end('Successfully created a task!');
})

router.post('/update/:id', (req, res) => {
    res.end('Successfully updated the task!');    
})

router.delete('/:id', (req, res) => {
    res.end('Successfully deleted the task!');   
})

module.exports = router;