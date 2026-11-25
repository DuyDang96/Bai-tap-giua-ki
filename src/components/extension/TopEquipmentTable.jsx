import React from 'react';

function TopEquipmentTable({ topBorrowed }) {
  return (
    <div className="card h-100">
      <div className="card-header">Thiết bị được mượn nhiều nhất</div>
      <table className="table align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Thiết bị</th>
            <th>Mức độ</th>
            <th className="text-end">Lượt</th>
          </tr>
        </thead>
        <tbody>
          {topBorrowed.map((item) => (
            <tr key={item.rank}>
              <td>{item.rank}</td>
              <td>{item.name}</td>
              <td style={{ width: '40%' }}>
                <div className="progress" role="progressbar" aria-valuenow={item.percent} aria-valuemin="0" aria-valuemax="100">
                  <div className="progress-bar" style={{ width: `${item.percent}%` }}></div>
                </div>
              </td>
              <td className="text-end">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopEquipmentTable;
