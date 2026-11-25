import React from 'react';

function AlertBanner({ alert, onClose }) {
  if (!alert || !alert.message) return null;

  const isSuccess = alert.type === 'success';
  const alertClass = isSuccess ? 'alert-success' : 'alert-danger';
  const iconClass = isSuccess ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger';

  return (
    <div
      className={`alert ${alertClass} alert-dismissible fade show d-flex align-items-center shadow-sm my-3`}
      role="alert"
    >
      <i className={`bi ${iconClass} fs-5 me-2`}></i>
      <div className="flex-grow-1">
        <strong>{isSuccess ? 'Thành công: ' : 'Lỗi: '}</strong>
        {alert.message}
      </div>
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
}

export default AlertBanner;
