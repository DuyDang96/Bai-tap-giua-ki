import React from 'react';

function StatCards({ summary }) {
  return (
    <div className="row g-3 mb-4">
      <div className="col-6 col-md-3">
        <div className="card">
          <div className="card-body">
            <div className="text-muted small">Tổng thiết bị</div>
            <div className="fs-3 fw-bold">{summary.totalEquipments}</div>
          </div>
        </div>
      </div>
      <div className="col-6 col-md-3">
        <div className="card">
          <div className="card-body">
            <div className="text-muted small">Đang được mượn</div>
            <div className="fs-3 fw-bold text-primary">{summary.currentlyBorrowed}</div>
          </div>
        </div>
      </div>
      <div className="col-6 col-md-3">
        <div className="card">
          <div className="card-body">
            <div className="text-muted small">Phiếu quá hạn</div>
            <div className="fs-3 fw-bold text-danger">{summary.overdueBorrows}</div>
          </div>
        </div>
      </div>
      <div className="col-6 col-md-3">
        <div className="card">
          <div className="card-body">
            <div className="text-muted small">Thiết bị nằm kho</div>
            <div className="fs-3 fw-bold text-secondary">{summary.inStock}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCards;
