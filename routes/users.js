const express = require('express');
const router = express.Router();
//Require User model
const User = require('../models/user');

//Routes
//Create users

router.post('/', (req, res, next) => {
    //grab body data
    //save the data to the database
    User.create(req.body, (err, data) => {
        if (err) return next(err);
        
        //sending response to the client
        res.json({ data });
    });    
})

//list all users form database

router.get('/', (req, res, next) => {
    User.find({}, (err, listUsers) => {
        console.log(listUsers);
        
        if (err) return next(err);
        res.render("users", {users: listUsers});
    });
});
// get a single user form database
// router.get('/:userId',  (req, res, next) => {
//     let id = req.params.userId;
//     User.findById(id, (err, user) => {
//         if (err) return next(err);
//         res.json({ user });
//     });
// })

router.get('/:email',  (req, res, next) => {
    let email = req.params.email;
    User.findOne({ email }, (err, user) => {
        if (err) return next(err);
        // res.json({ user : user});
        res.render("userDetails", { user });
    });
});

//update a single user
router.put('/:id', (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new : true }, (err, updatedUser) => {
        if (err) return next(err);
        res.json({ updatedUser });
    });
});


//delete a user
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, userDeleted) => {
        if(err) return next(err);

        res.send(userDeleted.name + "Deleted");
    });
});

router.get("/:id/delete", (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        res.redirect("/users/")
    });
});

module.exports = router;