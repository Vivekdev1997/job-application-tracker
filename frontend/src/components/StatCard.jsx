function StatCard({ label, value, tone = "primary" }) {
  return (
    <div className="col-12 col-md-6 col-xl-3">
      <article className={`stat-card border-${tone}`}>
        <p className="text-secondary mb-1">{label}</p>
        <strong className={`display-6 text-${tone}`}>{value}</strong>
      </article>
    </div>
  );
}

export default StatCard;

