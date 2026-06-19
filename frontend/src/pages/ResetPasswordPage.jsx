import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import AuthFormShell from "../components/AuthFormShell";
import { clearAuthFeedback, resetUserPassword } from "../store/authSlice";

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { error, isAuthenticated, status } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    token: searchParams.get("token") || "",
    password: "",
  });

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
    dispatch(resetUserPassword(form));
  };

  return (
    <AuthFormShell
      title="Choose a new password"
      subtitle="Paste your reset token and set a new secure password."
    >
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="token">
            Reset token
          </label>
          <input
            className="form-control"
            id="token"
            name="token"
            onChange={handleChange}
            required
            value={form.token}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            New password
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
          {status === "loading" ? "Resetting..." : "Reset password"}
        </button>
      </form>
      <p className="mb-0 mt-4 text-center">
        Back to <Link to="/login">sign in</Link>
      </p>
    </AuthFormShell>
  );
}

export default ResetPasswordPage;

