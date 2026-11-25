import React from 'react';

function Pagination({
  currentPage = 1,
  pageSize = 8,
  totalItems = 0,
  onPageChange,
  onPageSizeChange,
}) {
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  if (totalItems === 0) return null;

  const handlePrev = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  // Tạo dải số trang hiển thị
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      pages.push(
        <li key={1} className="page-item">
          <button type="button" className="page-link" onClick={() => onPageChange(1)}>
            1
          </button>
        </li>
      );
      if (startPage > 2) {
        pages.push(
          <li key="ellipsis-start" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <button
            type="button"
            className="page-link"
            onClick={() => onPageChange && onPageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <li key="ellipsis-end" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
      pages.push(
        <li key={totalPages} className="page-item">
          <button type="button" className="page-link" onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </button>
        </li>
      );
    }

    return pages;
  };

  const startIndex = Math.min((currentPage - 1) * pageSize + 1, totalItems);
  const endIndex = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-3 gap-2 py-2">
      <div className="d-flex align-items-center gap-2 text-muted small">
        <span>
          Hiển thị <strong>{startIndex}</strong> - <strong>{endIndex}</strong> / <strong>{totalItems}</strong> thiết bị
        </span>
        {onPageSizeChange && (
          <select
            className="form-select form-select-sm ms-2"
            style={{ width: 'auto' }}
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            aria-label="Chọn số mục mỗi trang"
          >
            <option value={5}>5 / trang</option>
            <option value={8}>8 / trang</option>
            <option value={10}>10 / trang</option>
            <option value={20}>20 / trang</option>
          </select>
        )}
      </div>

      <nav aria-label="Điều hướng phân trang">
        <ul className="pagination pagination-sm mb-0">
          <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
            <button
              type="button"
              className="page-link"
              onClick={handlePrev}
              disabled={currentPage <= 1}
              aria-label="Trang trước"
            >
              <i className="bi bi-chevron-left"></i> Trước
            </button>
          </li>

          {renderPageNumbers()}

          <li className={`page-item ${currentPage >= totalPages ? 'disabled' : ''}`}>
            <button
              type="button"
              className="page-link"
              onClick={handleNext}
              disabled={currentPage >= totalPages}
              aria-label="Trang sau"
            >
              Sau <i className="bi bi-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
