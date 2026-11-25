import React, { useState } from 'react';
import FineSummary from '../components/extension/FineSummary';
import FineTable from '../components/extension/FineTable';
import ReturnWithFineModal from '../components/extension/ReturnWithFineModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';
import EmptyState from '../components/common/EmptyState';
import AlertBanner from '../components/common/AlertBanner';
import borrowingApi from '../api/borrowingApi';
import { useFetch } from '../hooks/useFetch';

function FinesPage() {
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [alert, setAlert] = useState(null);

  // Lấy danh sách phiếu mượn từ API
  const {
    data: rawBorrowings,
    loading,
    error,
    refetch,
  } = useFetch(() => borrowingApi.getAll(), [], { initialData: [] });

  // Lọc và tính tiền phạt cho các phiếu quá hạn hoặc trả trễ
  const fines = (Array.isArray(rawBorrowings) ? rawBorrowings : [])
    .map((b) => {
      const today = new Date();
      const dueDate = new Date(b.due_date);
      const returnedDate = b.returned_at ? new Date(b.returned_at) : null;

      let isLate = false;
      let daysLate = 0;
      let isEstimated = false;

      if (!returnedDate && today > dueDate) {
        // Đang mượn nhưng quá hạn
        isLate = true;
        isEstimated = true;
        daysLate = Math.max(1, Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24)));
      } else if (returnedDate && returnedDate > dueDate) {
        // Đã trả nhưng trả trễ
        isLate = true;
        isEstimated = false;
        daysLate = Math.max(1, Math.ceil((returnedDate - dueDate) / (1000 * 60 * 60 * 24)));
      }

      if (!isLate) return null;

      const fineValue = daysLate * 10000 * Number(b.quantity);
      const fineFormatted = `${fineValue.toLocaleString('vi-VN')} đ`;

      return {
        id: b.id,
        code: b.code || `PM-${String(b.id).padStart(3, '0')}`,
        equipment: b.equipment_name,
        borrower: b.borrower_name,
        quantity: b.quantity,
        dueDate: b.due_date,
        returnDate: b.returned_at || '—',
        fineAmount: isEstimated ? `tạm tính ${fineFormatted}` : fineFormatted,
        isEstimated,
        status: b.borrow_status || (b.returned_at ? 'Đã trả' : 'Quá hạn'),
        statusType: b.returned_at ? 'success' : 'danger',
      };
    })
    .filter(Boolean);

  const handleOpenPayModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsPayModalOpen(true);
  };

  const handleConfirmPay = async (ticket) => {
    try {
      await borrowingApi.returnEquipment(ticket.id, {
        returned_at: new Date().toISOString().split('T')[0],
        note: `Đã thanh toán tiền phạt: ${ticket.fineAmount}`,
      });
      setAlert({
        type: 'success',
        message: `Đã xác nhận trả thiết bị và thanh toán tiền phạt cho phiếu ${ticket.code}!`,
      });
      setIsPayModalOpen(false);
      setSelectedTicket(null);
      await refetch();
    } catch (err) {
      setAlert({
        type: 'danger',
        message: err.message || 'Xác nhận nộp phạt thất bại!',
      });
    }
  };

  return (
    <main className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h1 className="h4 mb-0 fw-bold text-dark">Quản lý quá hạn & Tiền phạt</h1>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={refetch}
          title="Làm mới"
        >
          <i className="bi bi-arrow-clockwise me-1"></i> Làm mới
        </button>
      </div>
      <p className="text-muted small">
        Tự động tính toán tiền phạt dựa trên dữ liệu phiếu mượn quá hạn từ CSDL MySQL (10.000 đ/ngày trễ).
      </p>

      {/* Thông báo kết quả thao tác */}
      <AlertBanner alert={alert} onClose={() => setAlert(null)} />

      {/* Component tóm tắt */}
      <FineSummary />

      {/* Loading */}
      {loading && <LoadingSpinner message="Đang kiểm tra danh sách phiếu mượn quá hạn từ API..." />}

      {/* Error */}
      {!loading && error && <ErrorAlert message={error} onRetry={refetch} />}

      {/* Không có phiếu quá hạn */}
      {!loading && !error && fines.length === 0 && (
        <EmptyState
          icon="bi-shield-check text-success"
          title="Không có phiếu mượn nào bị quá hạn"
          message="Tuyệt vời! Hiện tại tất cả các phiếu mượn đều được hoàn trả đúng hạn hoặc chưa đến hạn."
        />
      )}

      {/* Bảng phiếu mượn có phạt */}
      {!loading && !error && fines.length > 0 && (
        <FineTable fines={fines} onOpenPayModal={handleOpenPayModal} />
      )}

      {/* Modal trả kèm tiền phạt */}
      <ReturnWithFineModal
        isOpen={isPayModalOpen}
        onClose={() => {
          setIsPayModalOpen(false);
          setSelectedTicket(null);
        }}
        ticket={selectedTicket}
        onConfirm={handleConfirmPay}
      />
    </main>
  );
}

export default FinesPage;
