const { User } = require('../models/user');
const { Post } = require('../models/post');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: {privateStatus: false},
            include: [{
                model: User,
                required: true,
                attributes: [`username`]
            }]
        })
        res.status(200).send(posts)
    } catch (error) {
        console.log('ERROR IN getAllPosts')
        console.log(error)
        res.sendStatus(400)
    }
}
const getCurrentUserPosts = async (req, res) => {
    try {
        const {userId} = req.params
        const posts = await Post.findAll({
            where: {userId: userId},
            include: [{
                model: User,
                required: true,
                attributes: [`username`]
            }]})
        res.status(200).send(posts)
    } catch (error) {
        console.log('ERROR IN getCurrentUserPosts')
        console.log(error)
        res.sendStatus(400)
    }
}
const addPost = async (req, res)=>  {
    try{
        const { title, content, status, userId } = req.body;
        await Post.create({title, content, privateStatus: status, userId});
        res.sendStatus(200)
    }catch (err){
        console.log('Unable to add post');
        console.log(err)
        res.sendStatus(400)
    }
}
const editPost = (req, res)=>  {
    console.log('allow user to make changes')
}
const deletePost = (req, res)=>  {
    console.log('allow user to delete their post')
}

module.exports = {
    getAllPosts, 
    getCurrentUserPosts,
    addPost,
    editPost,
    deletePost
}