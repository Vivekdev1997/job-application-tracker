import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import AuthFormShell from "../components/AuthFormShell";
import { clearAuthFeedback, register } from "../store/authSlice";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated, status } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

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
    dispatch(register(form));
  };

  return (
    <AuthFormShell
      title="Create your account"
      subtitle="Start tracking applications, interviews, and offers."
    >
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Full name
          </label>
          <input
            className="form-control"
            id="name"
            minLength="2"
            name="name"
            onChange={handleChange}
            required
            value={form.name}
          />
        </div>
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
          {status === "loading" ? "Creating account..." : "Create account"}
        </button>
      </form>
      <p className="mb-0 mt-4 text-center">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </AuthFormShell>
  );
}

export default RegisterPage;

