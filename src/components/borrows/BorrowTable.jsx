import React from 'react';
import { formatDate } from '../../utils/formatDate';

function BorrowTable({ borrows = [], onReturn, onDelete }) {
  // Trả về cấu hình hiển thị cho 3 trạng thái: Đang mượn, Đã trả, Quá hạn
  const getBadgeConfig = (status, returnedAt) => {
    if (returnedAt || status === 'Đã trả') {
      return {
        className: 'text-bg-success',
        icon: 'bi-check2-circle',
        label: 'Đã trả',
      };
    }
    if (status === 'Quá hạn') {
      return {
        className: 'text-bg-danger',
        icon: 'bi-exclamation-octagon-fill',
        label: 'Quá hạn',
      };
    }
    return {
      className: 'text-bg-primary',
      icon: 'bi-arrow-repeat',
      label: 'Đang mượn',
    };
  };

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col" style={{ width: '110px' }}>Mã phiếu</th>
              <th scope="col">Thiết bị mượn</th>
              <th scope="col">Người mượn</th>
              <th scope="col" className="text-center" style={{ width: '70px' }}>SL</th>
              <th scope="col" style={{ width: '120px' }}>Ngày mượn</th>
              <th scope="col" style={{ width: '120px' }}>Hạn trả</th>
              <th scope="col" style={{ width: '120px' }}>Ngày trả</th>
              <th scope="col" className="text-center" style={{ width: '130px' }}>Trạng thái</th>
              <th scope="col" className="text-end" style={{ width: '140px' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {borrows.map((b) => {
              const code = b.code || `PM-${String(b.id).padStart(3, '0')}`;
              const equipmentName = b.equipment_name || b.equipment;
              const borrowerName = b.borrower_name || b.borrower;
              const borrowDate = formatDate(b.borrowed_at || b.borrowDate);
              const dueDate = formatDate(b.due_date || b.dueDate);
              const returnDate = formatDate(b.returned_at || b.returnDate);
              const isReturned = Boolean(b.returned_at || b.status === 'Đã trả');
              const badge = getBadgeConfig(b.borrow_status || b.status, b.returned_at);

              return (
                <tr key={b.id}>
                  {/* Mã phiếu */}
                  <td className="text-nowrap fw-bold text-primary">{code}</td>

                  {/* Thiết bị */}
                  <td>
                    <div className="fw-semibold text-dark">{equipmentName}</div>
                    {b.equipment_code && (
                      <span className="badge text-bg-light border text-muted small">
                        {b.equipment_code}
                      </span>
                    )}
                  </td>

                  {/* Người mượn */}
                  <td>
                    <span className="text-dark fw-medium">{borrowerName}</span>
                  </td>

                  {/* Số lượng */}
                  <td className="text-center fw-bold text-dark">{b.quantity}</td>

                  {/* Ngày mượn (dd/mm/yyyy) */}
                  <td className="text-nowrap">{borrowDate}</td>

                  {/* Hạn trả (dd/mm/yyyy) */}
                  <td className="text-nowrap fw-medium text-dark">{dueDate}</td>

                  {/* Ngày trả (dd/mm/yyyy hoặc —) */}
                  <td className="text-nowrap">
                    {isReturned ? (
                      <span className="text-success fw-medium">
                        <i className="bi bi-calendar-check me-1"></i>
                        {returnDate}
                      </span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>

                  {/* Trạng thái (Đang mượn / Đã trả / Quá hạn) */}
                  <td className="text-center">
                    <span className={`badge px-2 py-1 ${badge.className} d-inline-flex align-items-center gap-1`}>
                      <i className={`bi ${badge.icon}`}></i>
                      {badge.label}
                    </span>
                  </td>

                  {/* Thao tác trả thiết bị */}
                  <td className="text-end text-nowrap">
                    {!isReturned ? (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-success me-1"
                        onClick={() => onReturn && onReturn(b)}
                        title="Xác nhận và ghi nhận ngày trả cho phiếu này"
                      >
                        <i className="bi bi-arrow-return-left me-1"></i> Trả
                      </button>
                    ) : (
                      <span className="badge text-bg-light border text-muted py-1 px-2 me-1">
                        <i className="bi bi-check-all text-success me-1"></i>Đã xong
                      </span>
                    )}

                    {onDelete && (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(b)}
                        title="Xóa phiếu mượn"
                      >
                        <i className="bi bi-trash"></i>
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

export default BorrowTable;
