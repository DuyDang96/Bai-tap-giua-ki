import React from 'react';
import { formatDate } from '../../utils/formatDate';

function FineTable({ fines, onOpenPayModal }) {
  return (
    <div className="card mb-4">
      <div className="card-header">Phiếu có tiền phạt</div>
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Mã phiếu</th>
              <th>Thiết bị</th>
              <th>Người mượn</th>
              <th className="text-end">SL</th>
              <th>Hạn trả</th>
              <th>Ngày trả</th>
              <th className="text-end">Tiền phạt</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fines.map((item) => (
              <tr key={item.id}>
                <td>{item.code}</td>
                <td>{item.equipment}</td>
                <td>{item.borrower}</td>
                <td className="text-end">{item.quantity}</td>
                <td>{formatDate(item.dueDate)}</td>
                <td>{formatDate(item.returnDate)}</td>
                <td className={`text-end ${item.isEstimated ? 'text-danger' : ''}`}>
                  {item.fineAmount}
                </td>
                <td>
                  <span className={`badge ${item.statusType === 'danger' ? 'text-bg-danger' : 'text-bg-success'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="text-end">
                  {item.status !== 'Đã trả' && (
                    <button 
                      className="btn btn-sm btn-outline-success"
                      onClick={() => onOpenPayModal && onOpenPayModal(item)}
                    >
                      Trả
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FineTable;
