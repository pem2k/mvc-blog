const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models')

router.post("/", async (req,res)=>{
    try{
        const newPost = await Post.create({
            title: req.body.title,
            content:req.body.content,
            user_id:req.session.user.id
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

router.get("/:id", async (req, res) => {
    try{
        const onePost = await Post.findByPk(req.params.id, {
            include: [
                {model: User}, 
                {
                model: Comment,  
               
            }]
        })
        
        const onePostReady = onePost.toJSON()
        console.log(onePostReady)
        res.render("onePost", {post: onePostReady, user: req.session.user,})

    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:"internal server error!",
            err
    })}
})

router.post("/comment", async (req, res) =>{
    try{
        const newComment = await Comment.create({
            content: req.body.content,
            user_id: req.session.user.id,
            post_id: req.body.post_id
        }
        )

        res.status(200).json()

    }catch(err){
        if(err){
            console.log(err)
            res.status(500).send("Internal server error")
        }
    }
})

router.delete("/", async(req, res) => {
    try{
    const delPost = await Post.findByPk(req.body.id)

    if(delPost.user_id != req.session.user.id){
        return res.status(403)
    }

   await delPost.destroy()

    res.status(204)
}catch(err){
    if(err){
        console.log(err)
        res.status(500).send("Internal server error")
    }
}
})


module.exports = router