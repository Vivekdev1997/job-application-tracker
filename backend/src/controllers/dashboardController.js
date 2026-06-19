const mongoose = require("mongoose");

const dashboardService = require("../services/dashboardService");

const getStats = async (req, res, next) => {
  try {
    const stats = await dashboardService.getDashboardStats(
      new mongoose.Types.ObjectId(req.user._id),
    );

    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
};

module.exports = { getStats };

