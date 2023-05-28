let Sequelize=require('sequelize');
let sequelize=require('../util/database');

let forgot=sequelize.define("forgot",{
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    active: Sequelize.BOOLEAN,
    expiresby: Sequelize.DATE
})

module.exports = forgot;