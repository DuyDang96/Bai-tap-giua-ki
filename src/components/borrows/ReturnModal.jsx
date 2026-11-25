import React, { useState, useEffect } from 'react';
import { getISODateString, formatDate } from '../../utils/formatDate';

function ReturnModal({
  isOpen,
  onClose,
  ticket,
  onConfirm,
  isSubmitting = false,
}) {
  const [returnData, setReturnData] = useState({
    returned_at: getISODateString(),
    note: '',
  });

  useEffect(() => {
    if (ticket) {
      setReturnData({
        returned_at: getISODateString(),
        note: ticket.note ? `${ticket.note} - [Đã hoàn trả thiết bị]` : 'Thiết bị hoạt động tốt, đầy đủ phụ kiện',
      });
    }
  }, [ticket, isOpen]);

  if (!isOpen || !ticket) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onConfirm) {
      onConfirm(ticket.id, {
        returned_at: returnData.returned_at,
        note: returnData.note.trim() || undefined,
      });
    }
  };

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered">
          <form className="modal-content shadow border-0" onSubmit={handleSubmit}>
            <div className="modal-header bg-success text-white py-3">
              <h5 className="modal-title fw-bold fs-6 mb-0">
                <i className="bi bi-arrow-return-left me-2"></i> Xác nhận trả thiết bị
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
                aria-label="Close"
                disabled={isSubmitting}
              ></button>
            </div>

            <div className="modal-body p-4">
              {/* Thẻ tóm tắt thông tin phiếu */}
              <div className="p-3 bg-light rounded border mb-3">
                <div className="row g-2 small">
                  <div className="col-sm-6">
                    <span className="text-muted">Mã phiếu:</span>{' '}
                    <strong className="text-primary">
                      {ticket.code || `PM-${String(ticket.id).padStart(3, '0')}`}
                    </strong>
                  </div>
                  <div className="col-sm-6">
                    <span className="text-muted">Số lượng mượn:</span>{' '}
                    <strong className="text-dark">{ticket.quantity} chiếc</strong>
                  </div>
                  <div className="col-12">
                    <span className="text-muted">Thiết bị:</span>{' '}
                    <strong className="text-dark">{ticket.equipment_name || ticket.equipment}</strong>
                  </div>
                  <div className="col-12">
                    <span className="text-muted">Người mượn:</span>{' '}
                    <strong className="text-dark">{ticket.borrower_name || ticket.borrower}</strong>
                  </div>
                  <div className="col-sm-6">
                    <span className="text-muted">Ngày mượn:</span>{' '}
                    <span>{formatDate(ticket.borrowed_at || ticket.borrowDate)}</span>
                  </div>
                  <div className="col-sm-6">
                    <span className="text-muted">Hạn trả:</span>{' '}
                    <span className="fw-semibold text-danger">
                      {formatDate(ticket.due_date || ticket.dueDate)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Nhập ngày trả thực tế */}
              <div className="mb-3">
                <label className="form-label fw-semibold" htmlFor="retDate">
                  Ngày trả thực tế <span className="text-danger">*</span>
                </label>
                <input
                  id="retDate"
                  type="date"
                  className="form-control"
                  value={returnData.returned_at}
                  onChange={(e) => setReturnData({ ...returnData, returned_at: e.target.value })}
                  disabled={isSubmitting}
                  required
                />
                <div className="form-text small text-muted">
                  Hệ thống sẽ ghi nhận ngày này làm ngày trả chính thức của phiếu mượn.
                </div>
              </div>

              {/* Nhập ghi chú khi trả */}
              <div className="mb-2">
                <label className="form-label fw-semibold" htmlFor="retNote">
                  Ghi chú tình trạng khi nhận lại
                </label>
                <input
                  id="retNote"
                  className="form-control"
                  placeholder="Ví dụ: Thiết bị hoạt động tốt, đầy đủ phụ kiện..."
                  value={returnData.note}
                  onChange={(e) => setReturnData({ ...returnData, note: e.target.value })}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="modal-footer bg-light py-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="btn btn-success fw-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Đang ghi nhận...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-lg me-1"></i> Ghi nhận trả thiết bị
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default ReturnModal;
