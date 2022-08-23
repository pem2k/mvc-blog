const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt");
const { User, Post, } = require('../models');
const path = require("path");
const sequelize = require('../config/connection');

//signup route
router.post("/signup", async (req, res) => {
    try {
        const newUser = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        })
		
		req.session.user = {
			id: newUser.id,
			first_name: newUser.first_name,
			last_name: newUser.last_name,
			email: newUser.email,
		}

        return res.redirect("home")

    } catch (err) {
        if (err) {
            res.status(500).json({ msg: "ERROR", err })
        }
    }
})

//get all users
router.get("/all", async (req, res)=> {
    const allUsers = await User.findAll({
        include: [
           { model: Post}
        ]
    })
    return res.status(200).json(allUsers)
}

)


//login route
router.post("/login", async (req, res) => {
    if (req.session.user) {
        return res.redirect("/");
    }
    const foundUser = await User.findOne({
        where: {
            email: req.body.email
        },
    }
    )
    if (!foundUser) {
        return res.status(401).json({ msg: "invalid login credentials" })

    }
    if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
        return res.status(401).json({ msg: "invalid login credentials" })
    }

	req.session.user = {
		id: foundUser.id,
		first_name: foundUser.first_name,
		last_name: foundUser.last_name,
		email: foundUser.email,
	}

    return res.redirect("home")
})

//logout route
router.delete("/logout", (req, res) => {
	if (!req.session.user) {
		return res.redirect("/")
	}
	req.session.destroy();
	return res.redirect("login")
})

module.exports = router;