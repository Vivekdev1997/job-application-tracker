import { Link } from "react-router";

function Header() {
  return (
    <nav className="navbar bg-white border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          Job Tracker
        </Link>
        <span className="badge text-bg-light border">Phase 1</span>
      </div>
    </nav>
  );
}

export default Header;

