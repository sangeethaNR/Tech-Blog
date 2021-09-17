const sequelize = require('../config/connection');
const { User, Post,Comment} = require('../models')

const userData = require('./userData.json');
const projectData = require('./postData.json');
const commentSeeds= require('./commentsData')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of projectData) {
    await Post.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  await commentSeeds();

  process.exit(0);
};

seedDatabase();
