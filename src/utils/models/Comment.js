const sequelize = require('sequelize');

module.exports = (db) => {
    const Comment = db.define('comment', {
        content : { type: sequelize.DataTypes.TEXT }
    });
    Comment.associate = ({Comment,Question,User}) => {
        Comment.belongsTo(User);
        User.hasMany(Comment);

        Question.hasMany(Comment);
        Comment.belongsTo(Question);
    };
    return Comment;
};