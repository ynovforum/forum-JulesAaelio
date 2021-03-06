const sequelize = require('sequelize');

module.exports = (db) => {
    const Question = db.define('question', {
        title : { type: sequelize.DataTypes.STRING },
        description : { type: sequelize.DataTypes.TEXT },
        resolvedAt : { type : sequelize.DataTypes.DATE}
    });
    Question.associate = ({Question,User,Comment}) => {
        Question.belongsTo(User);
        User.hasMany(Question);
        Question.belongsTo(Comment,{
            as: 'acceptedAnswer',
            constraints: false, allowNull:true,
        })
    };
    return Question;
};