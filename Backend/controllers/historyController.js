const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { History } = require("../models");
const ApiError = require("../utils/apiError");

const findHistories = async (req, res, next) => {
  try {
    const {
      gameId,
      playerId,
      username,
      correctAnswers,
      wrongAnswers,
      questionsCount,
      score,
      page,
      limit,
      search,
    } = req.query;

    const pageNum = parseInt(page) || 1;
    const limitData = parseInt(limit) || 10;
    const offset = (pageNum - 1) * limitData;

    const whereClause = {};
    if (gameId) whereClause.gameId = { [Op.iLike]: `%${gameId}%` };
    if (playerId) whereClause.playerId = { [Op.iLike]: `%${playerId}%` };
    if (username) whereClause.username = { [Op.iLike]: `%${username}%` };
    if (correctAnswers) whereClause.correctAnswers = correctAnswers;
    if (wrongAnswers) whereClause.wrongAnswers = wrongAnswers;
    if (questionsCount) whereClause.questionsCount = questionsCount;
    if (score) whereClause.score = score;

    if (search) {
      whereClause[Op.or] = [
        { gameId: { [Op.like]: `%${search}%` } },
        { playerId: { [Op.like]: `%${search}%` } },
        { username: { [Op.like]: `%${search}%` } },
        { correctAnswers: { [Op.like]: `%${search}%` } },
        { wrongAnswers: { [Op.like]: `%${search}%` } },
        { questionsCount: { [Op.like]: `%${search}%` } },
        { score: { [Op.like]: `%${search}%` } },
      ];
    }

    const { count, rows: histories } = await History.findAndCountAll({
      where: whereClause,
      offset,
      limit: limitData,
    });

    const totalPages = Math.ceil(count / limitData);

    res.status(200).json({
      code: 200,
      status: "Success Getting Histories",
      histories,
      pagination: {
        totalData: count,
        totalPages,
        pageNum,
        limitData,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findHistoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const history = await History.findByPk(id);

    if (!history) {
      return next(new ApiError(`History with ID: ${id} not found`, 404));
    }

    res.status(200).json({
      code: 200,
      status: `Success Getting History By ID ${id}`,
      history,
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const createHistory = async (req, res, next) => {
  try {
    const {
      username,
      correctAnswers,
      wrongAnswers,
      questionsCount,
      score,
    } = req.body;

    const gameId = uuidv4();
    const playerId = uuidv4();

    const newHistory = await History.create({
      gameId,
      playerId,
      username,
      correctAnswers,
      wrongAnswers,
      questionsCount,
      score,
    });

    res.status(201).json({
      code: 201,
      status: "Success Create New History",
      history: newHistory,
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const updateHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      username,
      correctAnswers,
      wrongAnswers,
      questionsCount,
      score,
    } = req.body;

    const history = await History.findByPk(id);

    if (!history) {
      return next(new ApiError(`History with ID: ${id} not found`, 404));
    }

    await history.update({
      username,
      correctAnswers,
      wrongAnswers,
      questionsCount,
      score,
    });

    res.status(200).json({
      code: 200,
      status: `Success Updated History With ID : ${id}`,
      history,
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const deleteHistory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const history = await History.findByPk(id);

    if (!history) {
      return next(new ApiError(`History with ID: ${id} not found`, 404));
    }

    await history.destroy();

    res.status(200).json({
      code: 200,
      status: "Success",
      message: `History with ID: ${id} has been deleted`,
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  findHistories,
  findHistoryById,
  createHistory,
  updateHistory,
  deleteHistory,
};
