const getAllPosts = (req, res)=>  {
    console.log('display all posts')
}
const getCurrentUserPosts = (req, res)=>  {
    console.log('only disply posts from the user')
}
const addPost = (req, res)=>  {
    console.log('allow user to add post')
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