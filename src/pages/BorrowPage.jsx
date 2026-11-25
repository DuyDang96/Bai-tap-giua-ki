import React, { useState } from 'react';
import BorrowForm from '../components/borrows/BorrowForm';
import BorrowFilter from '../components/borrows/BorrowFilter';
import BorrowTable from '../components/borrows/BorrowTable';
import ReturnModal from '../components/borrows/ReturnModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';
import EmptyState from '../components/common/EmptyState';
import AlertBanner from '../components/common/AlertBanner';
import borrowingApi from '../api/borrowingApi';
import equipmentApi from '../api/equipmentApi';
import { useFetch } from '../hooks/useFetch';

function BorrowPage() {
  const [currentFilter, setCurrentFilter] = useState('Tất cả');
  const [alert, setAlert] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Ánh xạ bộ lọc hiển thị sang tham số query của API Express
  const mapFilterToQuery = (filter) => {
    switch (filter) {
      case 'Đang mượn':
        return 'borrowing';
      case 'Quá hạn':
        return 'overdue';
      case 'Đã trả':
        return 'returned';
      default:
        return undefined;
    }
  };

  // 1. Tải danh sách phiếu mượn từ API
  const {
    data: borrowings,
    loading: loadingBorrowings,
    error: errorBorrowings,
    isEmpty: isEmptyBorrowings,
    refetch: refetchBorrowings,
  } = useFetch(
    () => borrowingApi.getAll({ status: mapFilterToQuery(currentFilter) }),
    [currentFilter],
    { initialData: [] }
  );

  // 2. Tải danh sách thiết bị để chọn trong BorrowForm
  const {
    data: equipments,
    refetch: refetchEquipments,
  } = useFetch(() => equipmentApi.getAll(), [], { initialData: [] });

  // Tạo phiếu mượn mới
  const handleCreateBorrow = async (borrowData) => {
    setIsSubmitting(true);
    try {
      await borrowingApi.create(borrowData);
      setAlert({
        type: 'success',
        message: 'Tạo phiếu mượn thiết bị thành công! Số lượng khả dụng trong kho đã được cập nhật.',
      });
      // Làm mới dữ liệu cả bảng mượn và danh sách thiết bị
      await Promise.all([refetchBorrowings(), refetchEquipments()]);
    } catch (err) {
      setAlert({
        type: 'danger',
        message: err.message || 'Tạo phiếu mượn thất bại!',
      });
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mở modal xác nhận trả thiết bị
  const handleOpenReturnModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsReturnModalOpen(true);
  };

  // Xác nhận trả thiết bị
  const handleConfirmReturn = async (ticketId, returnData) => {
    setIsSubmitting(true);
    try {
      await borrowingApi.returnEquipment(ticketId, returnData);
      setAlert({
        type: 'success',
        message: 'Xác nhận trả thiết bị thành công! Thiết bị đã được hoàn trả vào kho.',
      });
      setIsReturnModalOpen(false);
      setSelectedTicket(null);
      await Promise.all([refetchBorrowings(), refetchEquipments()]);
    } catch (err) {
      setAlert({
        type: 'danger',
        message: err.message || 'Xác nhận trả thiết bị thất bại!',
      });
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Xóa phiếu mượn
  const handleDeleteBorrowing = async (ticket) => {
    const isConfirmed = window.confirm(
      `Bạn có chắc chắn muốn xóa phiếu mượn PM-${String(ticket.id).padStart(3, '0')} của ${ticket.borrower_name || ticket.borrower}?`
    );
    if (!isConfirmed) return;

    try {
      await borrowingApi.delete(ticket.id);
      setAlert({
        type: 'success',
        message: `Đã xóa phiếu mượn PM-${String(ticket.id).padStart(3, '0')} thành công!`,
      });
      await Promise.all([refetchBorrowings(), refetchEquipments()]);
    } catch (err) {
      setAlert({
        type: 'danger',
        message: err.message || 'Xóa phiếu mượn thất bại!',
      });
    }
  };

  const safeBorrowings = Array.isArray(borrowings) ? borrowings : [];
  const safeEquipments = Array.isArray(equipments) ? equipments : [];

  return (
    <main className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 className="h4 mb-0 fw-bold text-dark">Phiếu mượn thiết bị</h1>
          <p className="text-muted small mb-0">
            Quản lý mượn/trả thiết bị trực tiếp từ máy chủ API quan-li-thiet-bi
          </p>
        </div>
      </div>

      {/* Thông báo kết quả thao tác (Thành công / Thất bại) */}
      <AlertBanner alert={alert} onClose={() => setAlert(null)} />

      {/* Form tạo phiếu mượn mới (kết nối trực tiếp với danh sách thiết bị thực tế) */}
      <BorrowForm
        equipments={safeEquipments}
        onSubmit={handleCreateBorrow}
        isSubmitting={isSubmitting}
      />

      {/* Bộ lọc trạng thái */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
        <BorrowFilter
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
        />
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary mb-3"
          onClick={() => {
            refetchBorrowings();
            refetchEquipments();
          }}
          title="Làm mới danh sách"
        >
          <i className="bi bi-arrow-clockwise me-1"></i> Làm mới
        </button>
      </div>

      {/* Trạng thái Đang tải dữ liệu */}
      {loadingBorrowings && (
        <LoadingSpinner message="Đang kết nối API và tải danh sách phiếu mượn..." />
      )}

      {/* Trạng thái Lỗi tải dữ liệu */}
      {!loadingBorrowings && errorBorrowings && (
        <ErrorAlert message={errorBorrowings} onRetry={refetchBorrowings} />
      )}

      {/* Trạng thái Không có dữ liệu */}
      {!loadingBorrowings && !errorBorrowings && isEmptyBorrowings && (
        <EmptyState
          icon="bi-journal-x"
          title="Không có phiếu mượn nào"
          message={
            currentFilter !== 'Tất cả'
              ? `Không tìm thấy phiếu mượn nào ở trạng thái "${currentFilter}".`
              : 'Hệ thống chưa có lượt mượn nào. Bạn hãy tạo phiếu mượn ở biểu mẫu phía trên.'
          }
          actionLabel={currentFilter !== 'Tất cả' ? 'Xem tất cả phiếu mượn' : undefined}
          onAction={currentFilter !== 'Tất cả' ? () => setCurrentFilter('Tất cả') : undefined}
        />
      )}

      {/* Bảng danh sách phiếu mượn */}
      {!loadingBorrowings && !errorBorrowings && !isEmptyBorrowings && (
        <BorrowTable
          borrows={safeBorrowings}
          onReturn={handleOpenReturnModal}
          onDelete={handleDeleteBorrowing}
        />
      )}

      {/* Modal Xác nhận Trả thiết bị */}
      <ReturnModal
        isOpen={isReturnModalOpen}
        onClose={() => {
          setIsReturnModalOpen(false);
          setSelectedTicket(null);
        }}
        ticket={selectedTicket}
        onConfirm={handleConfirmReturn}
        isSubmitting={isSubmitting}
      />
    </main>
  );
}

export default BorrowPage;
