const getHealth = (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Job Tracker API is healthy",
    timestamp: new Date().toISOString(),
  });
};

module.exports = { getHealth };

