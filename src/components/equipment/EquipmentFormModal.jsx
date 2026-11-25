import React, { useState, useEffect } from 'react';
import { CATEGORY_OPTIONS, normalizeCategoryKey } from '../../utils/categoryHelper';

function EquipmentFormModal({
  isOpen,
  onClose,
  equipment = null,
  onSave,
  isSubmitting = false,
}) {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    category: 'laptop',
    total_quantity: 1,
  });
  const [formError, setFormError] = useState('');

  // Số lượng đang mượn của thiết bị (nếu đang ở chế độ sửa)
  const currentlyBorrowed = equipment ? Number(equipment.currently_borrowed) || 0 : 0;

  useEffect(() => {
    if (equipment) {
      setFormData({
        code: equipment.code || '',
        name: equipment.name || '',
        category: normalizeCategoryKey(equipment.category),
        total_quantity:
          equipment.total_quantity !== undefined
            ? equipment.total_quantity
            : (equipment.total || 1),
      });
    } else {
      setFormData({
        code: '',
        name: '',
        category: 'laptop',
        total_quantity: 1,
      });
    }
    setFormError('');
  }, [equipment, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const cleanCode = formData.code.trim();
    const cleanName = formData.name.trim();
    const totalQty = Number(formData.total_quantity);

    // Kiểm tra dữ liệu đầu vào client-side trước khi gửi
    if (!cleanCode) {
      setFormError('Mã thiết bị (code) không được để trống!');
      return;
    }
    if (cleanCode.length > 50) {
      setFormError('Mã thiết bị không được dài quá 50 ký tự!');
      return;
    }
    if (!cleanName) {
      setFormError('Tên thiết bị (name) không được để trống!');
      return;
    }
    if (!formData.category) {
      setFormError('Vui lòng chọn loại danh mục thiết bị!');
      return;
    }
    if (!Number.isInteger(totalQty) || totalQty < 0) {
      setFormError('Tổng số lượng phải là một số nguyên không âm (>= 0)!');
      return;
    }

    // Kiểm tra ràng buộc kho khi sửa tổng số lượng
    if (equipment && totalQty < currentlyBorrowed) {
      setFormError(
        `Không thể giảm tổng số lượng xuống ${totalQty} chiếc vì hiện tại đang có ${currentlyBorrowed} chiếc đang được mượn!`
      );
      return;
    }

    try {
      if (onSave) {
        await onSave({
          code: cleanCode,
          name: cleanName,
          category: formData.category,
          total_quantity: totalQty,
        });
      }
    } catch (err) {
      setFormError(err.message || 'Lỗi khi lưu thông tin thiết bị!');
    }
  };

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered">
          <form className="modal-content shadow border-0" onSubmit={handleSubmit}>
            <div className="modal-header bg-light">
              <h5 className="modal-title fw-bold text-dark">
                <i className={`bi ${equipment ? 'bi-pencil-square' : 'bi-plus-circle'} me-2 text-primary`}></i>
                {equipment ? 'Sửa thông tin thiết bị' : 'Thêm thiết bị mới'}
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
                disabled={isSubmitting}
              ></button>
            </div>

            <div className="modal-body p-4">
              {/* Thông báo lỗi nếu dữ liệu không hợp lệ */}
              {formError && (
                <div className="alert alert-danger py-2 small mb-3 shadow-sm d-flex align-items-center" role="alert">
                  <i className="bi bi-exclamation-triangle-fill fs-5 me-2 text-danger flex-shrink-0"></i>
                  <div>{formError}</div>
                </div>
              )}

              {/* Cảnh báo khi sửa thiết bị đang có người mượn */}
              {equipment && currentlyBorrowed > 0 && (
                <div className="alert alert-warning py-2 small mb-3 d-flex align-items-center" role="alert">
                  <i className="bi bi-info-circle-fill fs-5 me-2 text-warning flex-shrink-0"></i>
                  <div>
                    Thiết bị này đang có <strong>{currentlyBorrowed} chiếc</strong> được mượn. Tổng số lượng tối thiểu phải là <strong>{currentlyBorrowed}</strong> chiếc.
                  </div>
                </div>
              )}

              <div className="mb-3">
                <label className="form-label fw-semibold" htmlFor="eqCode">
                  Mã thiết bị <span className="text-danger">*</span>
                </label>
                <input
                  id="eqCode"
                  className="form-control"
                  placeholder="Ví dụ: LAB-010 (Duy nhất trong hệ thống)"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  disabled={isSubmitting}
                  required
                />
                <div className="form-text small text-muted">
                  Mã định danh duy nhất của thiết bị (không được trùng lặp).
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold" htmlFor="eqName">
                  Tên thiết bị <span className="text-danger">*</span>
                </label>
                <input
                  id="eqName"
                  className="form-control"
                  placeholder="Ví dụ: Laptop Dell Latitude 5430"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="row g-3">
                <div className="col-md-7">
                  <label className="form-label fw-semibold" htmlFor="eqCat">
                    Loại thiết bị <span className="text-danger">*</span>
                  </label>
                  <select
                    id="eqCat"
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    disabled={isSubmitting}
                  >
                    {CATEGORY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-5">
                  <label className="form-label fw-semibold" htmlFor="eqTotal">
                    Tổng số lượng <span className="text-danger">*</span>
                  </label>
                  <input
                    id="eqTotal"
                    type="number"
                    className="form-control"
                    min={currentlyBorrowed}
                    value={formData.total_quantity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        total_quantity: e.target.value,
                      })
                    }
                    disabled={isSubmitting}
                    required
                  />
                  {currentlyBorrowed > 0 && (
                    <div className="form-text small text-muted">
                      Tối thiểu: {currentlyBorrowed} chiếc
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer bg-light">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-lg me-1"></i> Lưu thông tin
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default EquipmentFormModal;
