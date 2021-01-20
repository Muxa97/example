module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_ticker', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_hash: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      ticker_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true,
      },
    })
    return queryInterface.createTable('tickers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ticker: {
        allowNull: false,
        type: Sequelize.STRING(10),
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_ticker')
    return queryInterface.dropTable('tickers')
  },
}
