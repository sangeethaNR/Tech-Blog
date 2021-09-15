// const router = require('express').Router();
// const userRoutes = require('./userRoutes');
// const projectRoutes = require('./projectRoutes');

// router.use('/users', userRoutes);
// router.use('/posts', projectRoutes);

// module.exports = router;

const router = require('express').Router();
const userRoutes = require('./userRoutes');
 const postRoutes = require('./postRoutes');
// const commentRoutes = require('./comment-routes');
router.use('/users', userRoutes);
 router.use('/posts', postRoutes);
// router.use('/comments', commentRoutes);

module.exports = router;
