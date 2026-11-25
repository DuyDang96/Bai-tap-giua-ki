import React from 'react';
import { formatDate } from '../../utils/formatDate';
import { getCategoryLabel } from '../../utils/categoryHelper';

function EquipmentDetailModal({
  isOpen,
  onClose,
  equipment,
  onEdit,
}) {
  if (!isOpen || !equipment) return null;

  const total = Number(equipment.total_quantity) || 0;
  const borrowed = Number(equipment.currently_borrowed) || 0;
  const available = Number(equipment.available_quantity) !== undefined ? Number(equipment.available_quantity) : Math.max(0, total - borrowed);
  const borrowPercent = total > 0 ? Math.round((borrowed / total) * 100) : 0;
  const availablePercent = total > 0 ? 100 - borrowPercent : 0;

  const borrowings = Array.isArray(equipment.borrowings) ? equipment.borrowings : [];

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content shadow border-0">
            {/* Modal Header */}
            <div className="modal-header bg-light py-3">
              <div className="d-flex align-items-center">
                <div className="badge bg-primary fs-6 me-2 px-3 py-2">
                  {equipment.code}
                </div>
                <div>
                  <h5 className="modal-title fw-bold text-dark mb-0">
                    {equipment.name}
                  </h5>
                  <span className="badge text-bg-light border text-muted small mt-1">
                    Loại: {getCategoryLabel(equipment.category)}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body p-4">
              {/* Thẻ thống kê số lượng thiết bị */}
              <div className="row g-3 mb-4">
                <div className="col-sm-4">
                  <div className="card text-center border-0 bg-primary bg-opacity-10 py-3 rounded-3 shadow-none">
                    <span className="text-primary small fw-semibold text-uppercase">
                      Tổng số lượng
                    </span>
                    <h3 className="fw-bold text-primary mb-0 mt-1">{total}</h3>
                    <small className="text-muted">chiếc trong kho</small>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="card text-center border-0 bg-warning bg-opacity-10 py-3 rounded-3 shadow-none">
                    <span className="text-warning-emphasis small fw-semibold text-uppercase">
                      Đang được mượn
                    </span>
                    <h3 className="fw-bold text-warning-emphasis mb-0 mt-1">{borrowed}</h3>
                    <small className="text-muted">chiếc đang sử dụng</small>
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className={`card text-center border-0 ${available > 0 ? 'bg-success' : 'bg-danger'} bg-opacity-10 py-3 rounded-3 shadow-none`}>
                    <span className={`${available > 0 ? 'text-success' : 'text-danger'} small fw-semibold text-uppercase`}>
                      Số lượng còn có thể cho mượn
                    </span>
                    <h3 className={`fw-bold ${available > 0 ? 'text-success' : 'text-danger'} mb-0 mt-1`}>
                      {available}
                    </h3>
                    <small className="text-muted">
                      {available > 0 ? 'sẵn sàng cho mượn' : 'đã hết hàng'}
                    </small>
                  </div>
                </div>
              </div>

              {/* Thanh tỉ lệ khả dụng trực quan */}
              <div className="mb-4">
                <div className="d-flex justify-content-between small text-muted mb-1">
                  <span>
                    Khả dụng: <strong>{available} ({availablePercent}%)</strong>
                  </span>
                  <span>
                    Đang mượn: <strong>{borrowed} ({borrowPercent}%)</strong>
                  </span>
                </div>
                <div className="progress" style={{ height: '12px' }}>
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${availablePercent}%` }}
                    aria-valuenow={availablePercent}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    title={`Khả dụng: ${available}`}
                  ></div>
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: `${borrowPercent}%` }}
                    aria-valuenow={borrowPercent}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    title={`Đang mượn: ${borrowed}`}
                  ></div>
                </div>
              </div>

              {/* Thông tin chi tiết */}
              <div className="card bg-light border-0 p-3 mb-4">
                <div className="row g-2 small">
                  <div className="col-sm-6">
                    <span className="text-muted">Mã thiết bị:</span>{' '}
                    <strong className="text-dark">{equipment.code}</strong>
                  </div>
                  <div className="col-sm-6">
                    <span className="text-muted">Tên thiết bị:</span>{' '}
                    <strong className="text-dark">{equipment.name}</strong>
                  </div>
                  <div className="col-sm-6">
                    <span className="text-muted">Loại thiết bị:</span>{' '}
                    <strong className="text-dark">{getCategoryLabel(equipment.category)}</strong>
                  </div>
                  <div className="col-sm-6">
                    <span className="text-muted">Ngày nhập kho:</span>{' '}
                    <strong className="text-dark">{formatDate(equipment.created_at)}</strong>
                  </div>
                </div>
              </div>

              {/* Danh sách phiếu mượn của thiết bị */}
              <div>
                <h6 className="fw-bold text-dark d-flex align-items-center mb-2">
                  <i className="bi bi-clock-history text-primary me-2"></i>
                  Lịch sử mượn & Phiếu mượn hiện tại ({borrowings.length})
                </h6>

                {borrowings.length === 0 ? (
                  <div className="p-3 text-center text-muted bg-light rounded small">
                    <i className="bi bi-info-circle me-1"></i> Chưa có lượt mượn nào được ghi nhận cho thiết bị này.
                  </div>
                ) : (
                  <div className="table-responsive border rounded">
                    <table className="table table-sm table-hover align-middle mb-0 small">
                      <thead className="table-light">
                        <tr>
                          <th>Người mượn</th>
                          <th className="text-center">Số lượng</th>
                          <th>Ngày mượn</th>
                          <th>Hạn trả</th>
                          <th>Ngày trả</th>
                          <th>Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        {borrowings.map((b) => {
                          const isReturned = Boolean(b.returned_at || b.borrow_status === 'Đã trả');
                          const isOverdue = b.borrow_status === 'Quá hạn';
                          const badgeClass = isReturned
                            ? 'text-bg-success'
                            : isOverdue
                            ? 'text-bg-danger'
                            : 'text-bg-primary';

                          return (
                            <tr key={b.id}>
                              <td className="fw-semibold">{b.borrower_name}</td>
                              <td className="text-center">{b.quantity}</td>
                              <td>{formatDate(b.borrowed_at)}</td>
                              <td>{formatDate(b.due_date)}</td>
                              <td>{formatDate(b.returned_at)}</td>
                              <td>
                                <span className={`badge ${badgeClass}`}>
                                  {b.borrow_status || (isReturned ? 'Đã trả' : 'Đang mượn')}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer bg-light py-2">
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={onClose}
              >
                Đóng
              </button>
              {onEdit && (
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    onClose();
                    onEdit(equipment);
                  }}
                >
                  <i className="bi bi-pencil-square me-1"></i> Chỉnh sửa thiết bị này
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default EquipmentDetailModal;
