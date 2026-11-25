import React from 'react';

function MonthlyChart({ monthlyStats }) {
  return (
    <div className="card mt-3">
      <div className="card-header">Số lượt mượn theo tháng</div>
      <div className="card-body d-flex align-items-end" style={{ height: '200px' }}>
        {monthlyStats.map((item) => (
          <div key={item.month} className="text-center" style={{ width: '8.33%' }}>
            <div className="small text-muted">{item.count}</div>
            <div 
              className="bg-primary rounded-top mx-auto" 
              style={{ width: '60%', height: `${item.height}px` }}
            ></div>
            <div className="small mt-1">{item.month}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MonthlyChart;
