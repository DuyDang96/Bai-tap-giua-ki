import React from 'react';
import { studentBorrowHistory } from '../../mockData';
import { formatDate } from '../../utils/formatDate';

function MyBorrowings() {
  return (
    <div className="card mb-4">
      <div className="card-header">Lịch sử mượn của tôi</div>
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Mã phiếu</th>
              <th>Thiết bị</th>
              <th className="text-end">SL</th>
              <th>Ngày mượn</th>
              <th>Hạn trả</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {studentBorrowHistory.map((item, index) => (
              <tr key={index}>
                <td>{item.code}</td>
                <td>{item.equipment}</td>
                <td className="text-end">{item.quantity}</td>
                <td>{formatDate(item.borrowDate)}</td>
                <td>{formatDate(item.dueDate)}</td>
                <td>
                  <span className={`badge ${item.statusType === 'danger' ? 'text-bg-danger' : 'text-bg-success'}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyBorrowings;
