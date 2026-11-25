import React, { useState } from 'react';
import { getISODateString, getDefaultDueDateString, formatDate } from '../../utils/formatDate';

function BorrowForm({ equipments = [], onSubmit, isSubmitting = false }) {
  const today = getISODateString();
  const maxDueDate = getDefaultDueDateString(14); // Hạn trả tối đa 14 ngày

  const [formData, setFormData] = useState({
    equipment_id: '',
    borrower_name: '',
    quantity: 1,
    due_date: getDefaultDueDateString(7), // Mặc định 7 ngày
    note: '',
  });
  const [formError, setFormError] = useState('');

  // Tìm thiết bị đang được chọn
  const selectedEquipment = equipments.find(
    (e) => String(e.id) === String(formData.equipment_id)
  );

  const availableQuantity = selectedEquipment ? Number(selectedEquipment.available_quantity) : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const cleanBorrowerName = formData.borrower_name.trim();
    const qty = Number(formData.quantity);

    if (!formData.equipment_id) {
      setFormError('Vui lòng chọn thiết bị cần mượn!');
      return;
    }
    if (!cleanBorrowerName) {
      setFormError('Vui lòng nhập họ và tên người mượn!');
      return;
    }
    if (!Number.isInteger(qty) || qty <= 0) {
      setFormError('Số lượng mượn phải là số nguyên dương (lớn hơn 0)!');
      return;
    }

    // Kiểm tra: Số lượng mượn không vượt quá số lượng thiết bị đang có
    if (selectedEquipment && qty > availableQuantity) {
      setFormError(
        `Số lượng mượn (${qty} chiếc) vượt quá số lượng thiết bị đang có trong kho! Thiết bị "${selectedEquipment.name}" hiện chỉ còn ${availableQuantity} chiếc khả dụng.`
      );
      return;
    }

    if (!formData.due_date) {
      setFormError('Vui lòng chọn hạn trả!');
      return;
    }

    const borrowDateObj = new Date(today);
    const dueDateObj = new Date(formData.due_date);

    if (dueDateObj < borrowDateObj) {
      setFormError('Hạn trả không thể trước ngày mượn (ngày hiện tại)!');
      return;
    }

    // Kiểm tra: Thời hạn mượn tối đa 14 ngày
    const diffDays = Math.ceil((dueDateObj - borrowDateObj) / (1000 * 60 * 60 * 24));
    if (diffDays > 14) {
      setFormError(
        `Thời hạn mượn tối đa là 14 ngày! Bạn đang chọn mượn ${diffDays} ngày (hạn trả tối đa đến ngày ${formatDate(maxDueDate)}).`
      );
      return;
    }

    try {
      if (onSubmit) {
        await onSubmit({
          equipment_id: Number(formData.equipment_id),
          borrower_name: cleanBorrowerName,
          quantity: qty,
          borrowed_at: today, // Ngày mượn luôn là ngày hiện tại
          due_date: formData.due_date,
          note: formData.note.trim() || undefined,
        });

        // Reset form sau khi tạo thành công
        setFormData({
          equipment_id: '',
          borrower_name: '',
          quantity: 1,
          due_date: getDefaultDueDateString(7),
          note: '',
        });
      }
    } catch (err) {
      setFormError(err.message || 'Lỗi khi tạo phiếu mượn!');
    }
  };

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-header bg-light py-3 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <i className="bi bi-file-earmark-plus-fill text-primary fs-5 me-2"></i>
          <h5 className="card-title mb-0 fw-bold text-dark fs-6">Tạo phiếu mượn thiết bị</h5>
        </div>
        <span className="badge bg-primary bg-opacity-10 text-primary border border-primary-subtle px-3 py-1 small">
          <i className="bi bi-calendar-event me-1"></i> Ngày mượn: <strong>{formatDate(today)}</strong> (Hiện tại)
        </span>
      </div>

      <form className="card-body p-4" onSubmit={handleSubmit}>
        {formError && (
          <div className="alert alert-danger py-2 small mb-3 d-flex align-items-center shadow-sm" role="alert">
            <i className="bi bi-exclamation-triangle-fill fs-5 me-2 text-danger flex-shrink-0"></i>
            <div>{formError}</div>
          </div>
        )}

        <div className="row g-3">
          {/* 1. Chọn thiết bị */}
          <div className="col-md-4">
            <label className="form-label fw-semibold" htmlFor="bEq">
              Chọn thiết bị <span className="text-danger">*</span>
            </label>
            <select
              id="bEq"
              className="form-select"
              value={formData.equipment_id}
              onChange={(e) => setFormData({ ...formData, equipment_id: e.target.value })}
              disabled={isSubmitting}
              required
            >
              <option value="">-- Chọn thiết bị trong kho --</option>
              {equipments.map((eq) => {
                const avail = Number(eq.available_quantity) || 0;
                const isOutOfStock = avail <= 0;
                return (
                  <option key={eq.id} value={eq.id} disabled={isOutOfStock}>
                    [{eq.code}] {eq.name} — Khả dụng: {avail} {isOutOfStock ? '(Hết hàng)' : 'chiếc'}
                  </option>
                );
              })}
            </select>
            {selectedEquipment && (
              <div className="form-text small mt-1">
                Số lượng còn có thể mượn:{' '}
                <strong className={availableQuantity > 0 ? 'text-success' : 'text-danger'}>
                  {availableQuantity} chiếc
                </strong>
              </div>
            )}
          </div>

          {/* 2. Nhập tên người mượn */}
          <div className="col-md-3">
            <label className="form-label fw-semibold" htmlFor="bName">
              Tên người mượn <span className="text-danger">*</span>
            </label>
            <input
              id="bName"
              className="form-control"
              placeholder="Họ và tên người mượn..."
              value={formData.borrower_name}
              onChange={(e) => setFormData({ ...formData, borrower_name: e.target.value })}
              disabled={isSubmitting}
              required
            />
          </div>

          {/* 3. Số lượng mượn (không vượt quá số lượng thiết bị đang có) */}
          <div className="col-md-2">
            <label className="form-label fw-semibold" htmlFor="bQty">
              Số lượng <span className="text-danger">*</span>
            </label>
            <input
              id="bQty"
              type="number"
              className="form-control"
              min="1"
              max={selectedEquipment ? Math.max(1, availableQuantity) : 99}
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: parseInt(e.target.value, 10) || 1 })
              }
              disabled={isSubmitting}
              required
            />
            <div className="form-text small text-muted">
              {selectedEquipment ? `Tối đa ${availableQuantity} chiếc` : 'Theo kho'}
            </div>
          </div>

          {/* 4. Hạn trả (tối đa 14 ngày) */}
          <div className="col-md-3">
            <label className="form-label fw-semibold" htmlFor="bDue">
              Hạn trả (Tối đa 14 ngày) <span className="text-danger">*</span>
            </label>
            <input
              id="bDue"
              type="date"
              className="form-control"
              min={today}
              max={maxDueDate}
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              disabled={isSubmitting}
              required
            />
            <div className="form-text small text-muted">
              Đến hết ngày: <strong>{formatDate(maxDueDate)}</strong>
            </div>
          </div>

          {/* 5. Ghi chú */}
          <div className="col-md-9">
            <label className="form-label fw-semibold" htmlFor="bNote">
              Ghi chú mượn
            </label>
            <input
              id="bNote"
              className="form-control"
              placeholder="Mục đích sử dụng, môn học hoặc tình trạng bàn giao (không bắt buộc)..."
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          {/* 6. Nút gửi form */}
          <div className="col-md-3 d-flex align-items-end">
            <button
              type="submit"
              className="btn btn-primary w-100 fw-semibold py-2"
              disabled={isSubmitting || (selectedEquipment && availableQuantity <= 0)}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Đang ghi nhận...
                </>
              ) : (
                <>
                  <i className="bi bi-file-earmark-check me-1"></i> Tạo phiếu mượn
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BorrowForm;
