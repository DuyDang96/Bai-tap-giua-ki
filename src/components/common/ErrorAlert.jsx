import React from 'react';

function ErrorAlert({
  message = 'Không thể tải dữ liệu từ máy chủ.',
  onRetry,
}) {
  return (
    <div className="alert alert-danger d-flex align-items-center justify-content-between my-3 shadow-sm" role="alert">
      <div className="d-flex align-items-center">
        <i className="bi bi-exclamation-triangle-fill fs-4 me-3 text-danger"></i>
        <div>
          <strong className="d-block">Đã xảy ra lỗi!</strong>
          <span className="small">{message}</span>
        </div>
      </div>
      {onRetry && (
        <button type="button" className="btn btn-sm btn-danger ms-3 text-nowrap" onClick={onRetry}>
          <i className="bi bi-arrow-clockwise me-1"></i> Thử lại
        </button>
      )}
    </div>
  );
}

export default ErrorAlert;
