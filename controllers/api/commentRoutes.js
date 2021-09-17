const router = require('express').Router();
const { Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {

  console.log('inside')
  try {
    const newcomments = await Comment.create({
      commentText: req.body.content,
        post_id:req.body.post_id,
      user_id: req.session.user_id,
    });

    res.status(200).json(newcomments);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;