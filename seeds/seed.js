const sequelize = require("../config/connection");
const { User, Post } = require("../models")
require('dotenv').config();

const users= [
    {
        first_name: "Parker",
        last_name: "McKillop",
        email: "parker@parker.com",
        password: "password"
    },
    {
        first_name: "John",
        last_name: "McKillop",
        email: "john@john.com",
        password: "password"
    },
    {
        first_name: "Amy",
        last_name: "McKillop",
        email: "amy@amy.com",
        password: "password"
    },
]

const posts = [
    {
        title: "Test!",
        content: "Testing posting",
        user_id: 1
    },
    {
        title: "Test 2!",
        content: "Testing posting 2",
        user_id: 2
    },
    {
        title: "Test 3!",
        content: "Testing posting 3",
        user_id: 3
    },
]

const seeder = async () => {
    await sequelize.sync({force:true});
    await User.bulkCreate(users,{individualHooks:true})
    await Post.bulkCreate(posts)
    process.exit(0)
}

seeder()