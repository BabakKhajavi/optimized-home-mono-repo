'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Drop the 'findus_id' column from the 'requests' table
    await queryInterface.removeColumn('requests', 'findus_id');

    // Drop the 'address_id' column from the 'requests' table
    await queryInterface.removeColumn('requests', 'address_id');
  },

  async down(queryInterface, Sequelize) {
    // Re-add the 'findus_id' column to the 'requests' table
    await queryInterface.addColumn('requests', 'findus_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    // Re-add the 'address_id' column to the 'requests' table
    await queryInterface.addColumn('requests', 'address_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
