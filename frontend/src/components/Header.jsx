import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../store/authSlice";

function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <nav className="navbar bg-white border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          Job Tracker
        </Link>
        <div className="d-flex align-items-center gap-3">
          <span className="badge text-bg-light border">Phase 2</span>
          {isAuthenticated ? (
            <>
              <span className="small text-secondary">Hi, {user?.name}</span>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => dispatch(logout())}
                type="button"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-sm btn-outline-primary" to="/login">
                Login
              </Link>
              <Link className="btn btn-sm btn-primary" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
