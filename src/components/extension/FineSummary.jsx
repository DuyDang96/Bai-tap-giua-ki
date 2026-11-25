import React from 'react';

function FineSummary() {
  return (
    <div className="row g-3 mb-4">
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <div className="text-muted small">Tiền phạt đã thu</div>
            <div className="fs-4 fw-bold text-success">1.250.000 đ</div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <div className="text-muted small">Tiền phạt đang nợ</div>
            <div className="fs-4 fw-bold text-danger">380.000 đ</div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <div className="text-muted small">Mức phạt hiện hành</div>
            <div className="input-group mt-1">
              <input 
                type="number" 
                className="form-control" 
                defaultValue="5000" 
                aria-label="Mức phạt" 
              />
              <span className="input-group-text">đ / thiết bị / ngày</span>
              <button className="btn btn-outline-primary" type="button">Lưu</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FineSummary;
