function HomePage() {
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
          Project foundation is ready. Authentication arrives in Phase 2.
        </div>
      </div>
    </section>
  );
}

export default HomePage;

