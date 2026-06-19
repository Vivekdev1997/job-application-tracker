const TONES = {
  Applied: "primary",
  Interview: "warning",
  Offer: "success",
  Rejected: "danger",
};

function StatusDistributionChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="chart-card">
      <h2 className="h5 mb-1">Status Distribution</h2>
      <p className="text-secondary mb-4">Applications grouped by status</p>
      <div className="vstack gap-3">
        {data.map((item) => {
          const percent = total ? Math.round((item.count / total) * 100) : 0;
          const tone = TONES[item.status] || "secondary";

          return (
            <div key={item.status}>
              <div className="d-flex justify-content-between mb-1">
                <span>{item.status}</span>
                <span className="text-secondary">
                  {item.count} ({percent}%)
                </span>
              </div>
              <div
                className="progress"
                aria-label={`${item.status} applications`}
                role="progressbar"
              >
                <div
                  className={`progress-bar bg-${tone}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StatusDistributionChart;

