import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import AuthFormShell from "../components/AuthFormShell";
import { clearAuthFeedback, forgotPassword } from "../store/authSlice";

function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const { error, message, status } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");

  useEffect(() => {
    dispatch(clearAuthFeedback());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  return (
    <AuthFormShell
      title="Reset your password"
      subtitle="Enter your email and we will generate reset instructions."
    >
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-control"
            id="email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
        </div>
        <button
          className="btn btn-primary w-100"
          disabled={status === "loading"}
          type="submit"
        >
          {status === "loading" ? "Sending..." : "Send reset instructions"}
        </button>
      </form>
      <p className="mb-0 mt-4 text-center">
        Remembered it? <Link to="/login">Sign in</Link>
      </p>
    </AuthFormShell>
  );
}

export default ForgotPasswordPage;

