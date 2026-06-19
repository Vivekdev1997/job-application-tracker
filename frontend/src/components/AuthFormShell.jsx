import { Link } from "react-router";

function AuthFormShell({ children, subtitle, title }) {
  return (
    <section className="auth-card card mx-auto">
      <div className="card-body p-4 p-md-5">
        <Link className="text-decoration-none text-primary fw-bold" to="/">
          Job Tracker
        </Link>
        <h1 className="h3 fw-bold mt-4 mb-2">{title}</h1>
        <p className="text-secondary mb-4">{subtitle}</p>
        {children}
      </div>
    </section>
  );
}

export default AuthFormShell;

