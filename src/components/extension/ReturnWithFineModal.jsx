import React from 'react';

function ReturnWithFineModal({ isOpen, onClose, ticket, onConfirm }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Trả thiết bị</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="mb-2">
                Phiếu <strong>{ticket?.code || 'PM-001'}</strong> · {ticket?.equipment || 'Laptop Dell Latitude 5420'} · {ticket?.borrower || 'Nguyễn Văn An'}
              </p>
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Hạn trả</span>
                  <span>{ticket?.dueDate || '10/11/2026'}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Ngày trả</span>
                  <span>hôm nay</span>
                </li>
                <li className="list-group-item d-flex justify-content-between fw-bold">
                  <span>Tiền phạt</span>
                  <span className="text-danger">{ticket?.fineAmount?.replace('tạm tính ', '') || '60.000 đ'}</span>
                </li>
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Hủy
              </button>
              <button 
                type="button" 
                className="btn btn-success"
                onClick={() => {
                  if (onConfirm) onConfirm(ticket);
                  onClose();
                }}
              >
                Xác nhận trả
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default ReturnWithFineModal;
