const router = require('express').Router();
const userRoutes = require("./user-routes")
const postRoutes = require("./post-routes")
const bcrypt = require("bcrypt");
const { User, Post, Comment } = require("../models")

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

//page get routes
router.get('/', async (req, res) => {
    if (req.session.user){
        return res.redirect("/home");
    }

    res.render('login');
})

router.get('/signup', async (req, res) => {
    if (req.session.user){
        return res.redirect("home");
    }

    res.render('signup');
})

//dashboard get
router.get('/dashboard', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/')
    }

    const allPosts = await Post.findAll({
        order: [['createdAt', 'DESC']],
        where:{user_id:req.session.user.id},
        include: [User]
    })
   
    const jPosts = allPosts.map(element => element.toJSON())
    console.log(jPosts)

    return res.render("dashboard", {
        dashPost: jPosts,
        user: req.session.user
    })
})

//home get
router.get("/home", async(req,res)=> {

    const allPosts = await Post.findAll({
        order: [['createdAt', 'DESC']],
        include: User
    })
   
    const jPosts = allPosts.map(element => element.toJSON())

    return res.render("home", {
        posts: jPosts,
        user: req.session.user
    })
})

router.get("/logout", (req, res) => {
	if (!req.session.user) {
		return res.redirect("/")
	}
	req.session.destroy();
	return res.redirect("/")
})

module.exports = router
