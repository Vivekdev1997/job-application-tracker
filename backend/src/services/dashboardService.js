const JobApplication = require("../models/JobApplication");

const STATUSES = ["Applied", "Interview", "Offer", "Rejected"];

const getEmptyMonthlyApplications = () => {
  const now = new Date();

  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);

    return {
      label: date.toLocaleString("en", { month: "short" }),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      count: 0,
    };
  });
};

const getDashboardStats = async (userId) => {
  const [statusCounts, monthlyCounts] = await Promise.all([
    JobApplication.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
    JobApplication.aggregate([
      {
        $match: {
          user: userId,
          createdAt: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 5)),
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
    ]),
  ]);

  const cards = {
    totalApplications: 0,
    interviews: 0,
    offers: 0,
    rejected: 0,
  };

  const statusDistribution = STATUSES.map((status) => {
    const count =
      statusCounts.find((item) => item._id === status)?.count || 0;

    cards.totalApplications += count;

    if (status === "Interview") cards.interviews = count;
    if (status === "Offer") cards.offers = count;
    if (status === "Rejected") cards.rejected = count;

    return { status, count };
  });

  const monthlyApplications = getEmptyMonthlyApplications().map((item) => {
    const match = monthlyCounts.find(
      (count) =>
        count._id.month === item.month && count._id.year === item.year,
    );

    return {
      label: item.label,
      count: match?.count || 0,
    };
  });

  return {
    cards,
    monthlyApplications,
    statusDistribution,
  };
};

module.exports = { getDashboardStats };

