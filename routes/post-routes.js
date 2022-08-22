const express = require('express');
const router = express.Router();
const { Post, User } = require('../models')

router.post("/", async (req,res)=>{
    try{
        const newPost = await Post.create({
            user_id:req.session.user.id,
            content:req.body.content,
        })
        res.status(201).json(newPost)
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:"internal server error!",
            err
        })
    }
})

router.get("/all", async (req, res)=> {
    const allPosts = await Post.findAll()
    return res.status(200).json(allPosts)
}

)

module.exports = router