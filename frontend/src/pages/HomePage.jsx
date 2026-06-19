import { Link } from "react-router";
import { useSelector } from "react-redux";

import DashboardPage from "./DashboardPage";

function HomePage() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <DashboardPage />;
  }

  return (
    <section className="card hero-card mx-auto">
      <div className="card-body p-5">
        <span className="badge rounded-pill text-bg-primary mb-3">
          MERN portfolio project
        </span>
        <h1 className="display-5 fw-bold">Build a better job search.</h1>
        <p className="lead text-secondary mb-4">
          Track applications, interviews, offers, notes, resumes, and progress
          from one focused workspace.
        </p>
        <div className="alert alert-success mb-0" role="status">
          Authentication is ready. Register or log in to start building your
          application workspace.
        </div>
        <div className="d-flex gap-3 mt-4">
          <Link className="btn btn-primary" to="/register">
            Create Account
          </Link>
          <Link className="btn btn-outline-primary" to="/login">
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
