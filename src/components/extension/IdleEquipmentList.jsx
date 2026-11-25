import React from 'react';

function IdleEquipmentList({ idleEquipments }) {
  return (
    <div className="card h-100">
      <div className="card-header">Thiết bị nằm kho</div>
      <ul className="list-group list-group-flush">
        {idleEquipments.map((item, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{item.name}</span>
            <span className="badge text-bg-secondary">{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IdleEquipmentList;
