import React from 'react';
import { CATEGORY_OPTIONS } from '../../utils/categoryHelper';

function EquipmentToolbar({
  search = '',
  onSearchChange,
  category = '',
  onCategoryChange,
  onAddClick,
  onRefresh,
}) {
  return (
    <div className="row g-2 mb-3 align-items-center">
      <div className="col-md-5">
        <div className="input-group">
          <span className="input-group-text bg-white border-end-0">
            <i className="bi bi-search text-muted"></i>
          </span>
          <input
            type="search"
            className="form-control border-start-0"
            placeholder="Tìm theo tên hoặc mã thiết bị..."
            aria-label="Tìm thiết bị"
            value={search}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          />
          {search && (
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => onSearchChange && onSearchChange('')}
              title="Xóa tìm kiếm"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          )}
        </div>
      </div>

      <div className="col-md-4">
        <select
          className="form-select"
          aria-label="Lọc theo loại"
          value={category}
          onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
        >
          <option value="">Tất cả loại thiết bị</option>
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-3 text-md-end d-flex justify-content-md-end gap-2">
        {onRefresh && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onRefresh}
            title="Làm mới dữ liệu"
          >
            <i className="bi bi-arrow-clockwise"></i>
          </button>
        )}
        <button
          type="button"
          className="btn btn-primary text-nowrap"
          onClick={onAddClick}
        >
          <i className="bi bi-plus-lg me-1"></i> Thêm thiết bị
        </button>
      </div>
    </div>
  );
}

export default EquipmentToolbar;
