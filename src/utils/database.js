const sequelize = require('sequelize');
const requireModels = require('sequelize-require-models');
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

const models = requireModels(db,__dirname+'/models');

// Sync database
db.sync().then((r)=> {
    console.log("[DATABASE] Database synchronised");
}).catch(e => {
    console.error(e);
});

module.exports = Object.assign({ db }, models);
