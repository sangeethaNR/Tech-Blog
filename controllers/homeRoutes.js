const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
//console.log("postData" + postData);
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
console.log("posts:"+ JSON.stringify(posts))
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id',withAuth, async (req, res) => {
  await Post.findOne({
          where: {
              id: req.params.id
          },
          attributes: [
              'id',
              'header',
              'description',
              'date_created'
          ],
          include: [{
                  model: Comment,
                  attributes: ['id', 'commentText', 'post_id', 'user_id','date_created'],
                  include: {
                      model: User,
                      attributes: ['name']
                  }
              },
              {
                  model: User,
                  attributes: ['name']
              }
          ]
      })
      .then(dbPostData => {
          if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
          }
          const post = dbPostData.get({ plain: true });
          console.log(post);
          res.render('individualPost', { post,  logged_in: true });


      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});
// router.get('/posts/:id', async (req, res) => {
//   console.log('post id:' +req.params.id );
//   try {
//     const postData = await Post.findOne(req.params.id, {
//       where: {id :req.params.id},
//       include: [
//                 {
               
//             include: [{
//              model: Comment,
//             attributes: ['id', 'commentText', 'post_id', 'user_id', 'date_created'],
//             include: {
//                     model: User,
//                     attributes: ['name']
//            }
//            },
//           {
//                   model: User,
//                   attributes: ['name']
//               }
//           ]
//               },
//             ],
//           });
//   // try {
//   //   const postData = await Post.findOne({
//   //     where: {id :req.params.id},
      
//   //           attributes: [
//   //               'idQ `',
//   //               'header',
//   //               'description',
//   //               'date_created'
//   //           ],
//   //     include: [
//   //        {
         
//   //       //   include: [{
//   //       //     model: Comment,
//   //       //     attributes: ['id', 'commentText', 'post_id', 'user_id', 'date_created'],
//   //       //     include: {
//   //       //         model: User,
//   //       //         attributes: ['name']
//   //       //     }
//   //       // },
//   //       //{
//   //           model: User,
//   //           attributes: ['name']
//   //       }
//   //   ]
//   //      // },
//   //   //  ],
//   //   });
// //console.log('post is+' + post)
//     const post = postData.get({ plain: true });
// console.log("post :" + JSON.stringify(post));
//     res.render('individualPost', {
//       ...post,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
