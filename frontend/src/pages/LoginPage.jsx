import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import AuthFormShell from "../components/AuthFormShell";
import { clearAuthFeedback, login } from "../store/authSlice";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated, status } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    dispatch(clearAuthFeedback());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(form));
  };

  return (
    <AuthFormShell
      title="Welcome back"
      subtitle="Sign in to manage your job applications."
    >
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-control"
            id="email"
            name="email"
            onChange={handleChange}
            required
            type="email"
            value={form.email}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            id="password"
            minLength="8"
            name="password"
            onChange={handleChange}
            required
            type="password"
            value={form.password}
          />
        </div>
        <button
          className="btn btn-primary w-100"
          disabled={status === "loading"}
          type="submit"
        >
          {status === "loading" ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <div className="d-flex justify-content-between mt-4">
        <Link to="/forgot-password">Forgot password?</Link>
        <Link to="/register">Create account</Link>
      </div>
    </AuthFormShell>
  );
}

export default LoginPage;

