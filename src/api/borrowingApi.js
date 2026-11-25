import axiosClient from './axiosClient';

const borrowingApi = {
  // Lấy danh sách phiếu mượn (hỗ trợ params: status, borrower_name, equipment_id)
  getAll: (params) => axiosClient.get('/borrowings', { params }),

  // Lấy chi tiết phiếu mượn theo ID
  getById: (id) => axiosClient.get(`/borrowings/${id}`),

  // Tạo phiếu mượn mới: { equipment_id, borrower_name, quantity, borrowed_at, due_date, note }
  create: (data) => axiosClient.post('/borrowings', data),

  // Xác nhận trả thiết bị: { returned_at, note }
  returnEquipment: (id, data = {}) => axiosClient.put(`/borrowings/${id}/return`, data),

  // Xóa phiếu mượn
  delete: (id) => axiosClient.delete(`/borrowings/${id}`),
};

export default borrowingApi;
