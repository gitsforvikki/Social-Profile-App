const express = require('express');
const router = express.Router();
const authenticate =  require('../middlewares/authenticate');
const {body , validationResult} =  require('express-validator');
const User = require('../models/Users');
const Post = require('../models/Post');
const { route } = require('./userRouter');
const { request, response } = require('express');

/*
    @usage : Create a new Post
    @url : /api/posts/
    @fields : text , image
    @method : POST
    @access : PRIVATE
 */

router.post('/' , [
    body('text').notEmpty().withMessage('Text required'),
    body('image').notEmpty().withMessage('Image required')
],authenticate, async (request ,response)=>{
    let errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(401).json({errors : errors.array()});
    }

    try{
        let user =  await User.findById(request.user.id);
        let newPost = {
            user:request.user.id,
            text :request.body.text,
            image : request.body.image,
            name : user.name,
            avatar : user.avatar 
        };
        let post =  new  Post(newPost);
        post = await post.save();
        response.status(200).json({
            msg : 'Post created success.',
            post:post
        })
        
    }
    catch(error){
        console.log(error);
        response.status(500).json({errors : [{msg : error.message}]})
    }
});

/*
    @usage : Get All Posts
    @url : /api/posts/
    @fields : no-fields
    @method : GET
    @access : PRIVATE
 */
router.get('/' , authenticate , async (request , response)=>{
    try{
        let posts = await Post.find();
        if(!posts){
            return response.status(401).json({msg : 'No any post found'})
        }
        response.status(200).json({posts : posts});
    }
    catch(error){
        console.log(error);
        response.status(500).json({errors : [{msg : error.message}]})
    }
});


/*
    @usage : Get A Post with PostId
    @url : /api/posts/:postId
    @fields : no-fields
    @method : GET
    @access : PRIVATE
 */
router.get('/:postId' , authenticate, async(request , response)=>{
    try{
        let postId = request.params.postId;
        let post = await Post.findById(postId);
        if(!post){
            return response.status(401).json({msg : 'No post found'})
        }
        response.status(200).json({post : post});
    }
    catch(error){
        console.log(error);
        response.status(500).json({errors : [{msg : error.message}]})
    }
});

/*
    @usage : Delete A Post with PostId
    @url : /api/posts/:postId
    @fields : no-fields
    @method : DELETE
    @access : PRIVATE
 */

    router.delete('/:postId' , authenticate , async(request , response)=>{
        try{
            let postId =  request.params.postId;
            let post =  await Post.findById(postId);
            if(!post){
                return response.status(401).json({msg : 'No post found'})
            }
            post = await Post.findByIdAndRemove(postId);
            response.status(200).json({
                msg : 'Post is Deleted',
                post : post
            });
        }
        catch(error){
            console.log(error);
            response.status(500).json({errors : [{msg : error.message}]})
        }
    });
    /*
    @usage : Like A Post with PostId
    @url : /api/posts/like/:postId
    @fields : no-fields
    @method : PUT
    @access : PRIVATE
 */

    router.put('/likes/:postId',authenticate ,async(request , response)=>{
        try{
            let postId = request.params.postId;
            //chech post is exist or not
            let post = await Post.findById(postId);
            if(!post){
                return response.status(401).json({msg : 'No post found'})
            }
            //check post is already liked by the user or not
            if(post.likes.filter(like => like.user.toString() === request.user.id ).length > 0){
                return  response.status(401).json({msg : "Post has been already liked"});
            }
            //like the post
            post.likes.unshift({user : request.user.id});
            post.save();
            response.status(200).json({post : post});
        }
        catch(error){
            console.log(error);
            response.status(500).json({errors : [{msg : error.message}]})
        }
    });

    /*
    @usage : UnLike A Post with PostId
    @url : /api/posts/unlike/:postId
    @fields : no-fields
    @method : PUT
    @access : PRIVATE
 */

    router.put('/unlike/:postId',authenticate ,async(request , response)=>{
        try{
            let postId = request.params.postId;
            let post = await Post.findById(postId);
            if(!post){
                return response.status(401).json({msg : 'No post found'})
            }
            //check post is already liked by the user or not
            if(post.likes.filter(like => like.user.toString() === request.user.id.toString()).length = 0){
                return  response.status(401).json({msg : "Post has  not liked"});
            }
            let removableIndex = post.likes.map(like =>like.user.toString()).indexOf(request.user.id.toString());
            if(removableIndex !== -1){
                post.likes.splice(removableIndex , 1);
                post.save();
                response.status(200).json({post : post});
            }


        }
        catch(error){
            console.log(error);
            response.status(500).json({errors : [{msg : error.message}]})
        }
    });

    /*
    @usage : Create Comment to a post
    @url : /api/posts/comment/:postId
    @fields : text
    @method : POST
    @access : PRIVATE
 */
router.post('/comment/:postId',[
    body('text').notEmpty().withMessage('Text required')
], authenticate , async(request , response)=>{
    let errors =  validationResult(request);
    if(!errors.isEmpty()){
        return response.status(401).json({errors : errors.array()});
    }
    try{
        let postId  =  request.params.postId;
        let user =  await User.findOne({_id :request.user.id});
        let post = await Post.findById(postId);
        if(!post){
            return response.status(401).json({msg : 'No post found'})
        }
        
        let newComments = {
            user : request.user.id,
            text : request.body.text,
            name : user.name,
            avatar : user.avatar
        };
        post.comments.unshift(newComments);
        post = await post.save();
        response.status(200).json({post : post});
    }
    catch(error){
        console.log(error);
        response.status(500).json({errors : [{msg : error.message}]})
    }

});


/*
    @usage : Delete Comment of a post
    @url : /api/posts/comment/:postId/:commentId
    @fields : no-fields
    @method : DELETE
    @access : PRIVATE
 */
    router.delete('/comment/:postId/:commentId', authenticate , async (request , response) => {
        try {
            let postId = request.params.postId;
            let commentId = request.params.commentId;
    
            let post = await Post.findById(postId);
    
            // pull the comments of a post
            let comment = post.comments.find(comment => comment.id === commentId);
    
            // make sure the comment exists
            if(!comment){
                return response.status(404).json({msg : 'Comment not exists'});
            }
    
            // check user, is he only made the comment
            if(comment.user.toString() !== request.user.id){
                return response.status(401).json({msg : 'User is not authorized'});
            }
    
            // get remove index
            let removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(request.user.id);
            if(removeIndex !== -1){
                post.comments.splice(removeIndex, 1);
                await post.save();
                response.status(200).json({
                    msg :'Comment is deleted',
                    post : post
                });
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).json({errors : [{msg : error.message}]});
        }
    });


module.exports = router;