const express = require('express');
const router = express.Router();



router.get('/', (req, res) => { //It matches for a specific path name
    res.render('index');
});

router.get('/about', (req, res) => { //It matches for a specific path name
    res.render('about');
});


module.exports = router;