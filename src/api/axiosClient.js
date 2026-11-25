import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Khởi tạo axios instance kết nối tới API backend quan-li-thiet-bi
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor xử lý phản hồi thành công và trích xuất lỗi chuẩn từ API
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Xử lý trường hợp không thể kết nối tới server backend (máy chủ chưa bật hoặc sập)
    if (!error.response || error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      const detailedError =
        'Không thể kết nối đến máy chủ backend (http://localhost:8000). Hãy đảm bảo bạn đã khởi động server Node.js bằng lệnh "npm run dev" (hoặc "npm start") tại thư mục quan-li-thiet-bi và kiểm tra dịch vụ MySQL đang chạy!';
      return Promise.reject(new Error(detailedError));
    }

    // Trích xuất thông điệp lỗi chi tiết từ backend Express
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Đã xảy ra lỗi khi gửi yêu cầu đến máy chủ!';
    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
