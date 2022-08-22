const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model { }

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        title:{
            type: DataTypes.TEXT,

        },

        content:{
            type: DataTypes.TEXT,

        },
      
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "User",
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

module.exports = Post