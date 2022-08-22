const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      comment_contents:{
        type: DataTypes.TEXT,
        allowNull:false
      },
        
      user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "User",
            key: "id"
        },
        onDelete: "cascade"
    },

    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "Post",
            key: "id"
        },
        onDelete: "cascade"
    }

    },
    {
      sequelize,
      freezeTableName: true,
    }
)

module.exports = Comment