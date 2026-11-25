import React from 'react';

function EmptyState({
  icon = 'bi-inbox',
  title = 'Không có dữ liệu',
  message = 'Chưa có bản ghi nào được tìm thấy.',
  actionLabel,
  onAction,
}) {
  return (
    <div className="card text-center py-5 my-3 border-dashed">
      <div className="card-body">
        <div className="text-muted mb-3">
          <i className={`bi ${icon}`} style={{ fontSize: '3rem' }}></i>
        </div>
        <h5 className="fw-semibold text-secondary mb-1">{title}</h5>
        <p className="text-muted small mb-3">{message}</p>
        {actionLabel && onAction && (
          <button type="button" className="btn btn-sm btn-outline-primary" onClick={onAction}>
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}

export default EmptyState;
