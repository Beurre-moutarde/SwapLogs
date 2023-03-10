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
        res.render('signup');
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
        const applicationDetails = await ApplicationDetails.findAll({
            // attributes: ['stream_name'],
            where: {user_id : req.session.user_id},
            include: [
                {
                    model: StreamingServices,
                    attributes: ['stream_name']
                }
            ],
        });
        const userData = applicationDetails.map((details) => details.get({ plain: true }));
        res.render('profileMatching',{
            userData:userData,
            logged_in:true
        });

    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;



