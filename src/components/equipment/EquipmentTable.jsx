import React from 'react';
import { getCategoryLabel } from '../../utils/categoryHelper';

function EquipmentTable({
  equipments = [],
  onViewDetail,
  onEdit,
  onDelete,
}) {
  return (
    <div className="card shadow-sm border-0 mb-3">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col" style={{ width: '110px' }}>Mã</th>
              <th scope="col">Tên thiết bị</th>
              <th scope="col" style={{ width: '150px' }}>Loại thiết bị</th>
              <th scope="col" className="text-center" style={{ width: '90px' }}>Tổng số</th>
              <th scope="col" className="text-center" style={{ width: '110px' }}>Đang mượn</th>
              <th scope="col" className="text-center" style={{ width: '160px' }}>
                <span className="text-primary fw-bold">Còn có thể mượn</span>
              </th>
              <th scope="col" className="text-end" style={{ width: '220px' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {equipments.map((item) => {
              const total = item.total_quantity !== undefined ? item.total_quantity : (item.total ?? 0);
              const available = item.available_quantity !== undefined ? item.available_quantity : (item.remaining ?? total);
              const borrowed = item.currently_borrowed !== undefined ? item.currently_borrowed : (total - available);

              return (
                <tr key={item.id}>
                  <td className="text-nowrap fw-bold text-primary">{item.code}</td>
                  <td>
                    <div className="fw-semibold text-dark">{item.name}</div>
                  </td>
                  <td>
                    <span className="badge text-bg-light border text-dark">
                      {getCategoryLabel(item.category)}
                    </span>
                  </td>
                  <td className="text-center fw-medium">{total}</td>
                  <td className="text-center">
                    <span className={`badge ${borrowed > 0 ? 'text-bg-warning' : 'text-bg-light text-muted border'}`}>
                      {borrowed} chiếc
                    </span>
                  </td>
                  <td className="text-center">
                    <span
                      className={`badge px-3 py-2 fs-7 ${
                        available > 0 ? 'text-bg-success' : 'text-bg-danger'
                      }`}
                      title={available > 0 ? `Còn ${available} chiếc sẵn sàng cho mượn` : 'Thiết bị đã được mượn hết'}
                    >
                      <i className={`bi ${available > 0 ? 'bi-check-circle' : 'bi-x-circle'} me-1`}></i>
                      {available > 0 ? `${available} chiếc` : 'Hết hàng'}
                    </span>
                  </td>
                  <td className="text-end text-nowrap">
                    {/* Nút Xem chi tiết */}
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-info me-1"
                      onClick={() => onViewDetail && onViewDetail(item)}
                      title="Xem chi tiết thiết bị & lịch sử mượn"
                    >
                      <i className="bi bi-eye me-1"></i> Chi tiết
                    </button>

                    {/* Nút Sửa */}
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary me-1"
                      onClick={() => onEdit && onEdit(item)}
                      title="Chỉnh sửa thông tin và số lượng"
                    >
                      <i className="bi bi-pencil-square me-1"></i> Sửa
                    </button>

                    {/* Nút Xóa */}
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete && onDelete(item)}
                      title="Xóa thiết bị"
                    >
                      <i className="bi bi-trash me-1"></i> Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EquipmentTable;
