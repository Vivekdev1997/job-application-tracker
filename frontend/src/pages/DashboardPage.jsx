import { useEffect } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import MonthlyApplicationsChart from "../components/MonthlyApplicationsChart";
import StatCard from "../components/StatCard";
import StatusDistributionChart from "../components/StatusDistributionChart";
import { fetchDashboardStats } from "../store/dashboardSlice";

function DashboardPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { error, stats, status } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const cards = stats.cards;

  return (
    <section className="dashboard-page w-100">
      <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
        <div>
          <p className="text-primary fw-semibold mb-1">Dashboard</p>
          <h1 className="display-6 fw-bold mb-1">
            Welcome back, {user?.name || "there"}
          </h1>
          <p className="text-secondary mb-0">
            Track your pipeline health and application momentum.
          </p>
        </div>
        <Link className="btn btn-primary align-self-start" to="/jobs/new">
          Add Job
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {status === "loading" && (
        <div className="alert alert-info">Loading dashboard...</div>
      )}

      <div className="row g-3 mb-4">
        <StatCard
          label="Total Applications"
          value={cards.totalApplications}
          tone="primary"
        />
        <StatCard label="Interviews" value={cards.interviews} tone="warning" />
        <StatCard label="Offers" value={cards.offers} tone="success" />
        <StatCard label="Rejected" value={cards.rejected} tone="danger" />
      </div>

      <div className="row g-4">
        <div className="col-12 col-xl-7">
          <MonthlyApplicationsChart data={stats.monthlyApplications} />
        </div>
        <div className="col-12 col-xl-5">
          <StatusDistributionChart data={stats.statusDistribution} />
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;

