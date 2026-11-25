import React from 'react';

function QueueTable({ queue, onCancel }) {
  const getBadgeClass = (statusType) => {
    switch (statusType) {
      case 'success':
        return 'text-bg-success';
      case 'warning':
        return 'text-bg-warning';
      case 'secondary':
        return 'text-bg-secondary';
      default:
        return 'text-bg-light';
    }
  };

  return (
    <div className="card">
      <div className="card-header">Hàng chờ: Màn hình Dell 27 inch</div>
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Thứ tự</th>
              <th>Người đặt</th>
              <th className="text-end">SL</th>
              <th>Thời điểm đặt</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {queue.map((item, index) => {
              const isCancelled = item.status === 'Đã hủy';
              return (
                <tr key={index} className={isCancelled ? 'table-light text-muted' : ''}>
                  <td>{item.order}</td>
                  <td>{item.name}</td>
                  <td className="text-end">{item.quantity}</td>
                  <td>{item.time}</td>
                  <td>
                    <span className={`badge ${getBadgeClass(item.statusType)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="text-end">
                    {item.canCancel && (
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => onCancel && onCancel(index)}
                      >
                        Hủy
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QueueTable;
