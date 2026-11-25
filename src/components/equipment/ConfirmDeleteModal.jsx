import React from 'react';

function ConfirmDeleteModal({
  isOpen,
  onClose,
  equipment,
  onConfirm,
  isDeleting = false,
}) {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content shadow border-0">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title fw-bold fs-6">
                <i className="bi bi-exclamation-triangle-fill me-2"></i> Xác nhận xóa
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
                aria-label="Close"
                disabled={isDeleting}
              ></button>
            </div>
            <div className="modal-body p-3">
              <p className="mb-2">
                Bạn có chắc chắn muốn xóa thiết bị sau không?
              </p>
              <div className="p-2 bg-light rounded border mb-2">
                <div className="fw-bold text-dark">{equipment?.name}</div>
                <div className="text-muted small">Mã: {equipment?.code}</div>
              </div>
              <p className="text-muted small mb-0">
                <i className="bi bi-info-circle me-1"></i>
                Hệ thống sẽ từ chối xóa nếu thiết bị đang có lịch sử mượn.
              </p>
            </div>
            <div className="modal-footer bg-light p-2">
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={onClose}
                disabled={isDeleting}
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-sm btn-danger"
                disabled={isDeleting}
                onClick={() => onConfirm && onConfirm(equipment)}
              >
                {isDeleting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                    Đang xóa...
                  </>
                ) : (
                  <>
                    <i className="bi bi-trash me-1"></i> Xác nhận xóa
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default ConfirmDeleteModal;
