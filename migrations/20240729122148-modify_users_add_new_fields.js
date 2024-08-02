'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'users', 'role',
        {
          type: Sequelize.STRING,
          defaultValue: 'user'
        }
      ),
      queryInterface.addColumn(
        'users', 'verification_code',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'users', 'verified',
        {
          type: Sequelize.BOOLEAN
        }
      ),      
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('users', 'role'),
      queryInterface.removeColumn('users', 'verification_code'),
      queryInterface.removeColumn('users', 'verified')
    ]);
  }
};
