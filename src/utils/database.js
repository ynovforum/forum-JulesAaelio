const sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const db = new sequelize(process.env.DATABASE,process.env.DB_USER,process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

db.authenticate().then((r) => {
    console.log("[DATABASE] Connection established");
}).catch(e => {
    console.error(e);
});

const User = db.define('user', {
    firstname : { type: sequelize.STRING } ,
    lastname : { type: sequelize.STRING } ,
    email : { type: sequelize.STRING } ,
    password : { type: sequelize.STRING }
});

// Sync database
db.sync().then((r)=> {
    console.log("[DATABASE] Database synchronised");
}).catch(e => {
    console.error(e);
});

module.exports.sequelize = db;
module.exports.User = User;
