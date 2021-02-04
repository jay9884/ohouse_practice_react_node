const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            user_idx: {
              type: Sequelize.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true
            },
            id: {
              type: Sequelize.STRING(20),
              allowNull: false,
            },
            salt: {
                type: Sequelize.CHAR(64),
                allowNull: false,
            },
            pw: {
                type: Sequelize.CHAR(64),
                allowNull: false,
            },
            nickname: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            commercial: {
              type: Sequelize.BOOLEAN,
              allowNull: false,
            },
            enabled: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'user',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf9_general_ci',
        });
    }

    static associate(db) {

    }
};