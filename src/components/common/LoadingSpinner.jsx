import React from 'react';

function LoadingSpinner({ message = 'Đang tải dữ liệu từ máy chủ...' }) {
  return (
    <div className="card text-center py-5 my-3 shadow-sm border-0">
      <div className="card-body">
        <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="text-muted mb-0 fw-medium">{message}</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
