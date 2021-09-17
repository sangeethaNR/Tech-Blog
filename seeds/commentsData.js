const { Comment } = require('../models');

const commentsData =[
    {
        "commentText" : "This is the first comment",
        "user_id" : 1,
        "post_id" : 1
    },
    {
        "commentText" : "Sample comment",
        "user_id" : 3,
        "post_id" : 2
    }
]
const seedComments = () => Comment.bulkCreate(commentsData);

module.exports = seedComments;