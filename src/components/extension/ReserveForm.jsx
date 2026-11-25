import React from 'react';

function ReserveForm({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <>
      <div className="alert alert-info" role="alert">
        Màn hình đặt trước dành cho thiết bị đã được mượn hết.
      </div>
      <div className="card mb-4">
        <div className="card-header">Đặt trước thiết bị</div>
        <form className="card-body row g-3" onSubmit={handleSubmit}>
          <div className="col-md-5">
            <label className="form-label" htmlFor="rEq">Thiết bị</label>
            <select id="rEq" className="form-select" defaultValue="Màn hình Dell 27 inch">
              <option>Màn hình Dell 27 inch</option>
              <option>Laptop Dell Latitude 5420</option>
              <option>Raspberry Pi 4 (4GB)</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="rName">Người đặt</label>
            <input id="rName" className="form-control" placeholder="Họ và tên" />
          </div>
          <div className="col-md-1">
            <label className="form-label" htmlFor="rQty">SL</label>
            <input id="rQty" type="number" className="form-control" defaultValue="1" min="1" />
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <button type="submit" className="btn btn-primary w-100">
              Đặt trước
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ReserveForm;
