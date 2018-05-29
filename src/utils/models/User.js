const sequelize = require('sequelize');

module.exports = (db) => {
    const User = db.define('user', {
        firstname : { type: sequelize.STRING } ,
        lastname : { type: sequelize.STRING } ,
        email : { type: sequelize.STRING } ,
        password : { type: sequelize.STRING },
        bio: {type: sequelize.DataTypes.TEXT}
    });

    return User;
};