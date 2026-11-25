import React from 'react';
import StatCards from '../components/extension/StatCards';
import TopEquipmentTable from '../components/extension/TopEquipmentTable';
import IdleEquipmentList from '../components/extension/IdleEquipmentList';
import MonthlyChart from '../components/extension/MonthlyChart';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';
import equipmentApi from '../api/equipmentApi';
import borrowingApi from '../api/borrowingApi';
import { useFetch } from '../hooks/useFetch';
import { initialStats } from '../mockData';

function StatsPage() {
  // Lấy dữ liệu thiết bị từ CSDL
  const {
    data: equipments,
    loading: loadingEq,
    error: errorEq,
    refetch: refetchEq,
  } = useFetch(() => equipmentApi.getAll(), [], { initialData: [] });

  // Lấy dữ liệu phiếu mượn từ CSDL
  const {
    data: borrowings,
    loading: loadingBo,
    error: errorBo,
    refetch: refetchBo,
  } = useFetch(() => borrowingApi.getAll(), [], { initialData: [] });

  const safeEquipments = Array.isArray(equipments) ? equipments : [];
  const safeBorrowings = Array.isArray(borrowings) ? borrowings : [];

  // Tính toán số liệu thống kê thời gian thực từ CSDL MySQL
  const totalEquipments = safeEquipments.reduce(
    (sum, e) => sum + (Number(e.total_quantity) || 0),
    0
  );
  const currentlyBorrowed = safeEquipments.reduce(
    (sum, e) => sum + (Number(e.currently_borrowed) || 0),
    0
  );
  const overdueBorrows = safeBorrowings.filter(
    (b) => b.borrow_status === 'Quá hạn'
  ).length;
  const inStock = safeEquipments.filter(
    (e) => Number(e.available_quantity) > 0
  ).length;

  const liveSummary = {
    totalEquipments: totalEquipments || safeEquipments.length,
    currentlyBorrowed,
    overdueBorrows,
    inStock,
  };

  const isLoading = loadingEq || loadingBo;
  const hasError = errorEq || errorBo;

  return (
    <main className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h1 className="h4 mb-0 fw-bold text-dark">Thống kê và Báo cáo kho</h1>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => {
            refetchEq();
            refetchBo();
          }}
          title="Làm mới thống kê"
        >
          <i className="bi bi-arrow-clockwise me-1"></i> Cập nhật chỉ số
        </button>
      </div>
      <p className="text-muted small">
        Các chỉ số tổng hợp theo thời gian thực kết nối trực tiếp với CSDL MySQL qua API Node.js.
      </p>

      {isLoading && <LoadingSpinner message="Đang tính toán các chỉ số thống kê từ CSDL..." />}

      {!isLoading && hasError && (
        <ErrorAlert
          message={errorEq || errorBo}
          onRetry={() => {
            refetchEq();
            refetchBo();
          }}
        />
      )}

      {!isLoading && !hasError && (
        <>
          {/* 4 Thẻ chỉ số tổng quan từ CSDL */}
          <StatCards summary={liveSummary} />

          {/* Thiết bị mượn nhiều nhất và Thiết bị chưa phát sinh mượn */}
          <div className="row g-3">
            <div className="col-lg-7">
              <TopEquipmentTable topBorrowed={initialStats.topBorrowed} />
            </div>
            <div className="col-lg-5">
              <IdleEquipmentList idleEquipments={initialStats.idleEquipments} />
            </div>
          </div>

          {/* Biểu đồ tháng */}
          <MonthlyChart monthlyStats={initialStats.monthlyStats} />
        </>
      )}
    </main>
  );
}

export default StatsPage;
