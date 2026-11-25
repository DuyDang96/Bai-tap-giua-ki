import axiosClient from './axiosClient';

const equipmentApi = {
  // Lấy danh sách thiết bị (hỗ trợ params: search, category)
  getAll: (params) => axiosClient.get('/equipments', { params }),

  // Lấy chi tiết thiết bị theo ID
  getById: (id) => axiosClient.get(`/equipments/${id}`),

  // Thêm mới thiết bị: { code, name, category, total_quantity }
  create: (data) => axiosClient.post('/equipments', data),

  // Cập nhật thông tin thiết bị: { code, name, category, total_quantity }
  update: (id, data) => axiosClient.put(`/equipments/${id}`, data),

  // Xóa thiết bị
  delete: (id) => axiosClient.delete(`/equipments/${id}`),
};

export default equipmentApi;
