"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Histories", [
      {
        gameId: uuidv4(),
        playerId: uuidv4(),
        username: "Player1",
        correctAnswers: 5,
        wrongAnswers: 2,
        questionsCount: 7,
        score: 75,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gameId: uuidv4(),
        playerId: uuidv4(),
        username: "Player2",
        correctAnswers: 3,
        wrongAnswers: 4,
        questionsCount: 7,
        score: 43,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gameId: uuidv4(),
        playerId: uuidv4(),
        username: "Player3",
        correctAnswers: 6,
        wrongAnswers: 1,
        questionsCount: 7,
        score: 86,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        gameId: uuidv4(),
        playerId: uuidv4(),
        username: "Player4",
        correctAnswers: 0,
        wrongAnswers: 7,
        questionsCount: 7,
        score: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Histories", null, {});
  },
};
