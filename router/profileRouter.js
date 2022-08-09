const express = require('express');
const router = express.Router();
const {body , validationResult} = require('express-validator');
const authenticat = require('../middlewares/authenticate');
const Profile =  require('../models/Profile');
const User  = require('../models/Users');


//get my profile  router
router.get('/me', authenticat , async (request ,  response)=>{
    try{
        let profile =  await Profile.findOne({user : request.user.id}).populate('user' , ['name' ,'avatar']);
        if(!profile){
           return  response.status(400).json({
                errors :[{msg : 'Profile not found.'}]
            })
        }
        response.status(200).json({
            profile : profile
        })
    }
    catch(error){
        console.log(error);
        response.status(500).json({
            errors : [{msg : error.message}]
        });
    }
});


/*
    @usage : Create a Profile
    @url : /api/profiles/
    @fields : company , website , location , designation , skills , bio , githubUsername, youtube , facebook , twitter , linkedin , instagram
    @method : POST
    @access : PRIVATE
 */ 
router.post('/',authenticat,[
    body('company').notEmpty().withMessage('Company is Required'),
    body('website').notEmpty().withMessage('Website is Required'),
    body('location').notEmpty().withMessage('Location is Required'),
    body('designation').notEmpty().withMessage('Designation is Required'),
    body('skills').notEmpty().withMessage('Skills is Required'),
    body('bio').notEmpty().withMessage('Bio is Required'),
    body('githubUserName').notEmpty().withMessage('GithubUserName is Required'),
    body('youtube').notEmpty().withMessage('Youtube is Required'),
    body('facebook').notEmpty().withMessage('Facebook is Required'),
    body('linkedin').notEmpty().withMessage('Linkedin is Required'),
    body('twitter').notEmpty().withMessage('Twitter is Required'),
    body('instagram').notEmpty().withMessage('Instagram is Required')
], async(request , response)=>{
    let errors =  validationResult(request);
    if(!errors.isEmpty()){
        return response.status(401).json({errors : errors.array()});
    }

    try{
        let {company ,  website , location , designation , skills , bio , githubUserName , youtube , facebook , 
            linkedin , twitter , instagram} = request.body;
        
        let profileObj ={};
        profileObj.user = request.user.id;
        if(company) profileObj.company = company;
        if(website) profileObj.website = website;
        if(location) profileObj.location = location;
        if(designation) profileObj.designation = designation;
        if(skills) profileObj.skills = skills.toString().split(',').map(skill => skill.trim());
        if(bio) profileObj.bio = bio;
        if(githubUserName) profileObj.githubUserName = githubUserName;
        
        profileObj.social = {};
        if(youtube) profileObj.social.youtube = youtube;
        if(facebook) profileObj.social.facebook = facebook;
        if(linkedin) profileObj.social.linkedin = linkedin;
        if(twitter) profileObj.social.twitter = twitter;
        if(instagram) profileObj.social.instagram = instagram;
        
        //insert to db
        let profile = new Profile(profileObj);
        profile = await profile.save();
        response.status(200).json({
            msg : 'Profile created successfully',
            profile : profile
        })


    }
    catch(error){
        console.log(error);
        response.status(500).json({
            errors :[{msg : error.message}]
        });
    }
});




/*
    @usage : update a Profile
    @url : /api/profiles/
    @fields : company , website , location , designation , skills , bio , githubUsername, youtube , facebook , twitter , linkedin , instagram
    @method : POST
    @access : PRIVATE
 */ 
    router.put('/',authenticat,[
        body('company').notEmpty().withMessage('Company is Required'),
        body('website').notEmpty().withMessage('Website is Required'),
        body('location').notEmpty().withMessage('Location is Required'),
        body('designation').notEmpty().withMessage('Designation is Required'),
        body('skills').notEmpty().withMessage('Skills is Required'),
        body('bio').notEmpty().withMessage('Bio is Required'),
        body('githubUserName').notEmpty().withMessage('GithubUserName is Required'),
        body('youtube').notEmpty().withMessage('Youtube is Required'),
        body('facebook').notEmpty().withMessage('Facebook is Required'),
        body('linkedin').notEmpty().withMessage('Linkedin is Required'),
        body('twitter').notEmpty().withMessage('Twitter is Required'),
        body('instagram').notEmpty().withMessage('Instagram is Required')
    ], async(request , response)=>{
        let errors =  validationResult(request);
        if(!errors.isEmpty()){
            return response.status(401).json({errors : errors.array()});
        }
    
        try{
            let {company ,  website , location , designation , skills , bio , githubUserName , youtube , facebook , 
                linkedin , twitter , instagram} = request.body;
            let profile = await Profile.findOne({user : request.user.id});
            if(!profile){
                return response.status(401).json({
                    errors : [{msg : 'Profile not found'}]
                })
            }

            
            let profileObj ={};
            profileObj.user = request.user.id;
            if(company) profileObj.company = company;
            if(website) profileObj.website = website;
            if(location) profileObj.location = location;
            if(designation) profileObj.designation = designation;
            if(skills) profileObj.skills = skills.toString().split(',').map(skill => skill.trim());
            if(bio) profileObj.bio = bio;
            if(githubUserName) profileObj.githubUserName = githubUserName;
            
            profileObj.social = {};
            if(youtube) profileObj.social.youtube = youtube;
            if(facebook) profileObj.social.facebook = facebook;
            if(linkedin) profileObj.social.linkedin = linkedin;
            if(twitter) profileObj.social.twitter = twitter;
            if(instagram) profileObj.social.instagram = instagram;
            
            //update to db
            profile = await Profile.findOneAndUpdate({user : request.user.id},{
                $set : profileObj
            },{new : true})
            response.status(200).json({
                msg : 'Profile update successfully',
                profile : profile
            })
    
    
        }
        catch(error){
            console.log(error);
            response.status(500).json({
                errors :[{msg : error.message}]
            });
        }
    });
    


/*
    @usage : GET Profile of a user
    @url : /api/profiles/users/:userId
    @fields : no-fields
    @method : GET
    @access : PUBLIC
*/

    router.get('/users/:id' , async (request , response)=>{
            try{
                let userId =  request.params.id;
                let profile = await Profile.findOne({user : userId}).populate('user',['name','avatar']);
                if(!profile){
                    return response.status(401).json({
                        erros :[{msg :'Profile found for this user.'}]
                    })
                }
                response.status(200).json({
                    profile : profile
                })
            }
            catch(error){
                console.log(error);
                response.status(500).json({
                    errors : [{msg : error.message}]
                });
            }
    });


    /*
    @usage : DELETE Profile , userInfo , posts of a user
    @url : /api/profiles/users/:userId
    @fields : no-fields
    @method : DELETE
     @access : PRIVATE
   */

    router.delete('/users/:userId' ,authenticat , async  (request ,  response)=>{
        try{
            let userId =request.params.userId; 
            let profile = await Profile.findOne({user : userId});
            if(!profile){
                return response.status(401).json({msg : 'profile not found for this user.'})
            }

            //profile remove
            profile = await Profile.findOneAndRemove({user : userId});
            
            //check user exist or not
            let user =  await User.findOne({_id : userId});
            if(!user){
                return response.status(401).json({msg : 'user does not exist'});
            }
            await User.findOneAndRemove({user : userId});
            response.status(200).json({msg : 'Account delete success.'});

        }
        catch(error){
            console.log(error);
            response.status(500).json({
                errors : [{msg : error.message}]
            });
        }
    });

    
/*
    @usage : Add Experience of a profile
    @url : /api/profiles/experience/
    @fields : title , company , location , from , to , current , description
    @method : PUT
    @access : PRIVATE
 */
    router.put('/experience' , [
        body('title').notEmpty().withMessage('Title is Required'),
        body('company').notEmpty().withMessage('Company is Required'),
        body('location').notEmpty().withMessage('Location is Required'),
        body('from').notEmpty().withMessage('From is Required'),
        body('description').notEmpty().withMessage('Description is Required'),
    ], authenticat , async (request , response) => {
        let errors = validationResult(request);
        if(!errors.isEmpty()){
            return  response.status(401).json({errors : errors.array()});
        }
        try {
            let {title , company, location , from , description , to , current} = request.body;
            let newExperience = {
                title : title,
                company : company,
                location : location,
                from : from,
                description : description,
                to : to ? to : ' ',
                current : current ? current : false
            };
            // get profile of a user
            let profile = await Profile.findOne({user : request.user.id});
            if(!profile){
                return response.status(400).json({errors : [{msg : 'No Profile is Found'}]});
            }
            profile.experience.unshift(newExperience);
            profile = await profile.save();
            response.status(200).json({
                msg :'Education added successful',
                profile : profile});
        }
        catch (error) {
            console.error(error);
            response.status(500).json({errors : [{msg : error.message}]});
        }
    });

/*
    @usage : Delete an Experience of a profile
    @url : /api/profiles/experience/:expId
    @fields : no-fields
    @method : DELETE
    @access : PRIVATE
 */
   
    router.delete('/experience/:expId', authenticat , async (request , response) => {
        try {
            let experienceID = request.params.expId;
    
            // check if profile is exists
            let profile = await Profile.findOne({user : request.user.id});
            if(!profile){
                return response.status(400).json({errors : [{msg : 'No Profile is Found'}]});
            }
            let removableIndex =  profile.experience.map(exp => exp._id.toString()).indexOf(experienceID);
            if(removableIndex !== -1){
                profile.experience.splice(removableIndex , 1);
                profile = await profile.save();
                response.status(200).json({
                    msg : 'Experience is Deleted',
                    profile : profile
                });
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).json({errors : [{msg : error.message}]});
        }
    });


/*
    @usage : ADD Education of a profile
    @url : /api/profiles/education/
    @fields : school , degree , fieldOfStudy , from , to , current , description
    @method : PUT
    @access : PRIVATE
 */
router.put('/education',[
    body('school').notEmpty().withMessage('School required'),
    body('degree').notEmpty().withMessage('degree required'),
    body('fieldOfEducation').notEmpty().withMessage('fieldOfEducation required'),
    body('from').notEmpty().withMessage('from required'),
    body('description').notEmpty().withMessage('description required')
],authenticat,async (request , response)=>{
    let errors =  validationResult(request);
    if(!errors.isEmpty()){
        return response.status(401).json({errors : errors.array()})
    }
    try{
        let profile = await Profile.findOne({user : request.user.id});
        if(!profile){
            return response.status(401).json({msg : "Profile not found for this user"});
        }

        let {school , degree ,fieldOfEducation , from , description , to ,current } = request.body;
        let newEducation={
            school : school,
            degree : degree,
            fieldOfEducation : fieldOfEducation,
            from :from,
            to : to ? to : ' ',
            current : current  ? current :  false,
            description : description

        };

        //put education to the profile
        profile.education.unshift(newEducation);
        //save the profile to db
        profile = await profile.save();
        response.status(200).json({
            msg : 'Education added successfully',
            profile : profile
        })

    }
    catch(error){
        console.log(error);
        response.status(500).json({
            errors : [{msg : error.message}]
        });
    }
})

/*
    @usage : Delete an Education of a profile
    @url : /api/profiles/education/:eduId
    @fields : no-fields
    @method : DELETE
    @access : PRIVATE
 */
    router.delete('/education/:eduId', authenticat , async (request , response) => {
        try {
            let educationID = request.params.eduId;
    
            // check if profile is exists
            let profile = await Profile.findOne({user : request.user.id});
            if(!profile){
                return response.status(400).json({errors : [{msg : 'No Profile is Found'}]});
            }
            let removableIndex = profile.education.map(edu => edu._id.toString()).indexOf(educationID);
            if(removableIndex !== -1){
                profile.education.splice(removableIndex , 1);
                profile = await profile.save();
                response.status(200).json({
                    msg : 'Education is Deleted',
                    profile : profile
                });
            }
        }
        catch (error) {
            console.error(error);
            response.status(500).json({errors : [{msg : error.message}]});
        }
    });
    /*
    @usage : Get all Profiles
    @url : /api/profiles/all
    @fields : no-fields
    @method : GET
    @access : PUBLIC
 */
router.get('/all' , async (request  ,response)=>{
    try{
        
        let profiles =  await Profile.find().populate('user',['name' , 'avatar']);
        if(!profiles){
            return response.status(404).json({msg : "No any Profiles  found"});
        }
        response.status(200).json({
            profiles : profiles
        })
    }
    catch(error){
        console.log(error);
        response.status(500).json({
            errors : [{msg : error.message}]
        });
    }
});

/*
    @usage : GET Profile of a user with Profile Id
    @url : /api/profiles/:profileId
    @fields : no-fields
    @method : GET
    @access : PUBLIC
 */


    router.get('/:profileId' , async (request , response)=>{
        try{
            let profileId = request.params.profileId;
            let profile = await Profile.findById(profileId).populate('user',['name' , 'avatar']);
            if(!profile){
                return response.status(401).json({msg : "Profile not found"});
            }
            response.status(200).json({
                profile : profile
            })
        }
        catch(error){
            console.log(error);
            response.status(500).json({
                errors : [{msg : error.message}]
            });
        }
    })

module.exports = router;