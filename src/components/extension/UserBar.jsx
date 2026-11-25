import React from 'react';

export function StudentUserBar() {
  return (
    <div className="card mb-3">
      <div className="card-header">Thanh người dùng: sinh viên</div>
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <strong>Nguyễn Văn An</strong>{' '}
          <span className="badge text-bg-info">Sinh viên</span>
        </div>
        <button type="button" className="btn btn-sm btn-outline-secondary">
          Đăng xuất
        </button>
      </div>
    </div>
  );
}

export function StaffUserBar({ onSelectTab }) {
  return (
    <div className="card">
      <div className="card-header">Thanh người dùng: nhân viên quản lý</div>
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <strong>Hoàng Thu Hà</strong>{' '}
          <span className="badge text-bg-warning">Nhân viên</span>
          <button 
            type="button" 
            className="btn btn-link ms-3 p-0 small text-decoration-none"
            onClick={() => onSelectTab && onSelectTab('equipment')}
          >
            Quản lý thiết bị
          </button>
          <button 
            type="button" 
            className="btn btn-link ms-2 p-0 small text-decoration-none"
            onClick={() => onSelectTab && onSelectTab('borrows')}
          >
            Tất cả phiếu mượn
          </button>
        </div>
        <button type="button" className="btn btn-sm btn-outline-secondary">
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
