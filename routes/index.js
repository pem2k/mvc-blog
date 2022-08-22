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
        return res.redirect("/home");
    }

    res.render('signup');
})

//dashboard get
router.get('/dashboard', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/')
    } 

    const allPosts = await Post.findAll()  

    return res.render("dashboard", {
        posts: allPosts,
        user: req.session.user
    })
       
});

//home get
router.get("/home", async(req,res)=> {
    if (!req.session.user) {
        return res.redirect('/')
    }

    const allPosts = await Post.findAll({
        where: {
            user_id: req.session.user.id
        }
    })    
    return res.render("home", {
        posts: allPosts,
        user: req.session.user
    })
})


module.exports = router
