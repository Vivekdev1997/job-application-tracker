function MonthlyApplicationsChart({ data }) {
  const max = Math.max(...data.map((item) => item.count), 1);

  return (
    <div className="chart-card">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h5 mb-1">Monthly Applications</h2>
          <p className="text-secondary mb-0">Applications created recently</p>
        </div>
      </div>
      <div className="bar-chart" aria-label="Monthly applications chart">
        {data.map((item) => (
          <div className="bar-chart-item" key={item.label}>
            <div
              className="bar-chart-bar"
              style={{ height: `${Math.max((item.count / max) * 100, 4)}%` }}
              title={`${item.label}: ${item.count}`}
            />
            <span className="small text-secondary">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MonthlyApplicationsChart;

