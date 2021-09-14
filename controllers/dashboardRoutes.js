const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');


// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
    try {
        console.log('checeking user_id :' + req.session.user_id)
      //post of particular user
      const postData = await Post.findAll({
        where:{  
       user_id: req.session.user_id},
      
    
      });
  //console.log('post data : ' + postData);
      const dashboard_post = postData.map((post) => post.get({ plain: true }));
  //    console.log('dashboard_post without: ' + dashboard_post);

 console.log("dashborad post:" + JSON.stringify(dashboard_post));
      res.render('dashboard', {
        dashboard_post,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //new post in dashboard

  router.get('/new', (req, res) => {
    res.render('newPost');
});

  module.exports = router;