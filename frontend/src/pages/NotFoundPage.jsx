import { Link } from "react-router";

function NotFoundPage() {
  return (
    <section className="text-center mx-auto">
      <p className="display-1 fw-bold text-primary mb-0">404</p>
      <h1>Page not found</h1>
      <Link className="btn btn-primary mt-3" to="/">
        Return home
      </Link>
    </section>
  );
}

export default NotFoundPage;

