import React, { useState } from 'react';
import EquipmentToolbar from '../components/equipment/EquipmentToolbar';
import EquipmentTable from '../components/equipment/EquipmentTable';
import Pagination from '../components/equipment/Pagination';
import EquipmentFormModal from '../components/equipment/EquipmentFormModal';
import EquipmentDetailModal from '../components/equipment/EquipmentDetailModal';
import ConfirmDeleteModal from '../components/equipment/ConfirmDeleteModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';
import EmptyState from '../components/common/EmptyState';
import AlertBanner from '../components/common/AlertBanner';
import equipmentApi from '../api/equipmentApi';
import { useFetch } from '../hooks/useFetch';

function EquipmentPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [detailedEquipment, setDetailedEquipment] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [alert, setAlert] = useState(null);

  // Hook tải danh sách thiết bị từ API Express
  const {
    data: equipments,
    loading,
    error,
    isEmpty,
    refetch,
  } = useFetch(
    () =>
      equipmentApi.getAll({
        search: search.trim() || undefined,
        category: category || undefined,
      }),
    [search, category],
    { initialData: [] }
  );

  // Mở modal Thêm thiết bị
  const handleOpenAdd = () => {
    setSelectedEquipment(null);
    setIsFormModalOpen(true);
  };

  // Mở modal Sửa thiết bị
  const handleOpenEdit = (item) => {
    setSelectedEquipment(item);
    setIsFormModalOpen(true);
  };

  // Mở modal Xóa thiết bị
  const handleOpenDelete = (item) => {
    setSelectedEquipment(item);
    setIsDeleteModalOpen(true);
  };

  // Mở modal Xem chi tiết thiết bị (gọi API getById để lấy thông tin mới nhất và danh sách mượn)
  const handleOpenDetail = async (item) => {
    try {
      const res = await equipmentApi.getById(item.id);
      const detail = res?.data || item;
      setDetailedEquipment(detail);
      setIsDetailModalOpen(true);
    } catch (err) {
      // Nếu API getById lỗi, vẫn mở với dữ liệu sẵn có và báo lỗi
      setDetailedEquipment(item);
      setIsDetailModalOpen(true);
    }
  };

  // Thêm hoặc Cập nhật thiết bị (kể cả tổng số lượng)
  const handleSaveEquipment = async (formData) => {
    setIsSubmitting(true);
    try {
      if (selectedEquipment) {
        await equipmentApi.update(selectedEquipment.id, formData);
        setAlert({
          type: 'success',
          message: `Cập nhật thiết bị "${formData.name}" (Mã: ${formData.code}) thành công!`,
        });
      } else {
        await equipmentApi.create(formData);
        setAlert({
          type: 'success',
          message: `Thêm thiết bị mới "${formData.name}" (Mã: ${formData.code}) thành công!`,
        });
      }
      setIsFormModalOpen(false);
      await refetch();
    } catch (err) {
      // Hiển thị thông báo lỗi rõ ràng từ API (ví dụ: trùng mã code, số lượng < đang mượn)
      setAlert({
        type: 'danger',
        message: err.message || 'Thao tác lưu thiết bị thất bại!',
      });
      throw err; // Ném tiếp để EquipmentFormModal hiển thị formError
    } finally {
      setIsSubmitting(false);
    }
  };

  // Xóa thiết bị
  const handleConfirmDelete = async (item) => {
    if (!item) return;
    setIsDeleting(true);
    try {
      await equipmentApi.delete(item.id);
      setAlert({
        type: 'success',
        message: `Đã xóa thiết bị "${item.name}" (Mã: ${item.code}) thành công!`,
      });
      setIsDeleteModalOpen(false);
      await refetch();
    } catch (err) {
      // Hiển thị trực tiếp thông báo lỗi từ API
      setAlert({
        type: 'danger',
        message: err.message || 'Xóa thiết bị thất bại!',
      });
      setIsDeleteModalOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  // Xử lý phân trang trên danh sách kết quả
  const safeEquipments = Array.isArray(equipments) ? equipments : [];
  const totalItems = safeEquipments.length;
  const paginatedEquipments = safeEquipments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <main className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 className="h4 mb-0 fw-bold text-dark">Quản lý thiết bị</h1>
          <p className="text-muted small mb-0">
            Hệ thống quản lý kho, kiểm tra số lượng có thể cho mượn và xem chi tiết thiết bị
          </p>
        </div>
      </div>

      {/* Thông báo kết quả thao tác (Thành công / Thất bại) */}
      <AlertBanner alert={alert} onClose={() => setAlert(null)} />

      {/* Thanh công cụ Tìm kiếm / Lọc theo loại / Thêm mới */}
      <EquipmentToolbar
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        category={category}
        onCategoryChange={(val) => {
          setCategory(val);
          setCurrentPage(1);
        }}
        onAddClick={handleOpenAdd}
        onRefresh={refetch}
      />

      {/* Trạng thái Đang tải dữ liệu */}
      {loading && <LoadingSpinner message="Đang kết nối API và tải danh sách thiết bị..." />}

      {/* Trạng thái Lỗi tải dữ liệu */}
      {!loading && error && (
        <ErrorAlert message={error} onRetry={refetch} />
      )}

      {/* Trạng thái Không có dữ liệu */}
      {!loading && !error && isEmpty && (
        <EmptyState
          icon="bi-laptop"
          title="Không tìm thấy thiết bị nào"
          message={
            search || category
              ? `Không có thiết bị nào phù hợp với từ khóa "${search}" hoặc loại đã chọn.`
              : 'Kho chưa có thiết bị nào. Hãy bấm "Thêm thiết bị" để bắt đầu nhập kho.'
          }
          actionLabel={search || category ? 'Xóa bộ lọc' : 'Thêm thiết bị mới'}
          onAction={
            search || category
              ? () => {
                  setSearch('');
                  setCategory('');
                  setCurrentPage(1);
                }
              : handleOpenAdd
          }
        />
      )}

      {/* Bảng dữ liệu thiết bị và phân trang */}
      {!loading && !error && !isEmpty && (
        <>
          <EquipmentTable
            equipments={paginatedEquipments}
            onViewDetail={handleOpenDetail}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
          />

          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize);
              setCurrentPage(1);
            }}
          />
        </>
      )}

      {/* Modal Xem chi tiết thiết bị */}
      <EquipmentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setDetailedEquipment(null);
        }}
        equipment={detailedEquipment}
        onEdit={(eq) => {
          handleOpenEdit(eq);
        }}
      />

      {/* Modal Thêm / Sửa thiết bị (kể cả tổng số lượng) */}
      <EquipmentFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        equipment={selectedEquipment}
        onSave={handleSaveEquipment}
        isSubmitting={isSubmitting}
      />

      {/* Modal Xác nhận Xóa thiết bị */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        equipment={selectedEquipment}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </main>
  );
}

export default EquipmentPage;
