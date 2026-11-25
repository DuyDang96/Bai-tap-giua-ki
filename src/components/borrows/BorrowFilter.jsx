import React from 'react';

function BorrowFilter({ currentFilter, onFilterChange }) {
  const filters = [
    { label: 'Tất cả phiếu', value: 'Tất cả', icon: 'bi-collection' },
    { label: 'Đang mượn', value: 'Đang mượn', icon: 'bi-hourglass-split' },
    { label: 'Đã trả', value: 'Đã trả', icon: 'bi-check-circle' },
    { label: 'Quá hạn', value: 'Quá hạn', icon: 'bi-exclamation-triangle' },
  ];

  return (
    <div className="btn-group mb-3 shadow-sm flex-wrap" role="group" aria-label="Lọc theo trạng thái phiếu mượn">
      {filters.map((filter) => {
        const isActive = currentFilter === filter.value;
        return (
          <button
            key={filter.value}
            type="button"
            className={`btn ${isActive ? 'btn-primary active' : 'btn-outline-secondary'}`}
            aria-pressed={isActive}
            onClick={() => onFilterChange && onFilterChange(filter.value)}
          >
            <i className={`bi ${filter.icon} me-1`}></i>
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}

export default BorrowFilter;
