'use strict'
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize
  const Ad = app.model.define('ad', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    link: STRING,
    img: STRING,
    createdAt: DATE,
    updatedAt: DATE
  }, {
    paranoid: true
  })
  return Ad
}
