const router = require('express').Router();
const { User,  StreamingServices, ApplicationDetails } = require('../models');
const withAuth = require('../utils/auth');


//    /homepage route 
router.get('/', (req, res) => {
    try {
        res.render('homepage');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/signup', async (req, res) => {
    try {
        const Password = generatePassword(12)
        res.render('signup', {Password});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profileMatching', withAuth, async (req, res) => {
    try {
        
        const findUser = await User.findAll({
            attributes:["name"],
            where: {id: req.session.user_id},
        })
        
        const applicationDetails = await ApplicationDetails.findAll({
            attributes:["user_id","streaming_services_id"],
            where: {user_id: req.session.user_id},
            include: [
                {
                    model: StreamingServices,
                    attributes: ['stream_name'],
                },
                {
                    model: User,
                    attributes: ['name'],
                }
            ],
        });

        const usingServices = await ApplicationDetails.findAll({
            attributes:["streaming_services_id","in_use_by"],
            where: {in_use_by: req.session.user_id},
            include:[
                {
                    model:StreamingServices,
                    attributes: ['stream_name'],
                }
            ]
        })

        const loginUser = findUser.map((details) => details.get({ plain: true }));
        const sharingData = applicationDetails.map((details) => details.get({ plain: true }));
        const usingServiceData = usingServices.map((details) => details.get({ plain: true }));

        if (sharingData.length === 0){
            const message = {message:'please share your service'};
            const data = [loginUser,message]
            res.render('profileMatching',{
                data:data,
                logged_in:true
            });
        }else{
            const data = [
                loginUser,
                sharingData,
                usingServiceData,
            ]
            res.render('profileMatching',{
                data:data,
                logged_in:true
            });
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/sharePage', withAuth, async(req,res) => {
    try {
        res.render('sharePage');
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;



