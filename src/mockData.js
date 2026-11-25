// Dữ liệu mẫu khởi tạo theo các file giao diện gốc Rikkei Lab

export const initialEquipments = [
  { id: 1, code: 'LAB-001', name: 'Laptop Dell Latitude 5420', category: 'Laptop', total: 10, remaining: 7 },
  { id: 2, code: 'LAB-002', name: 'Laptop Lenovo ThinkPad E14', category: 'Laptop', total: 8, remaining: 8 },
  { id: 3, code: 'LAB-003', name: 'Màn hình LG 24 inch', category: 'Màn hình', total: 12, remaining: 9 },
  { id: 4, code: 'LAB-004', name: 'Màn hình Dell 27 inch', category: 'Màn hình', total: 6, remaining: 0 },
  { id: 5, code: 'LAB-005', name: 'Bo mạch Arduino Uno R3', category: 'Bo mạch điện tử', total: 30, remaining: 24 },
  { id: 6, code: 'LAB-006', name: 'Raspberry Pi 4 (4GB)', category: 'Bo mạch điện tử', total: 15, remaining: 11 },
  { id: 7, code: 'LAB-007', name: 'Bàn phím cơ Keychron K2', category: 'Phụ kiện', total: 20, remaining: 18 },
  { id: 8, code: 'LAB-008', name: 'Chuột không dây Logitech', category: 'Phụ kiện', total: 25, remaining: 22 },
];

export const initialBorrows = [
  { id: 1, code: 'PM-001', equipment: 'Laptop Dell Latitude 5420', borrower: 'Nguyễn Văn An', quantity: 2, borrowDate: '03/11/2026', dueDate: '10/11/2026', returnDate: '—', status: 'Quá hạn', statusType: 'danger' },
  { id: 2, code: 'PM-002', equipment: 'Màn hình LG 24 inch', borrower: 'Trần Thị Bình', quantity: 1, borrowDate: '05/11/2026', dueDate: '19/11/2026', returnDate: '—', status: 'Đang mượn', statusType: 'primary' },
  { id: 3, code: 'PM-003', equipment: 'Bo mạch Arduino Uno R3', borrower: 'Lê Minh Châu', quantity: 6, borrowDate: '01/11/2026', dueDate: '08/11/2026', returnDate: '07/11/2026', status: 'Đã trả', statusType: 'success' },
  { id: 4, code: 'PM-004', equipment: 'Raspberry Pi 4 (4GB)', borrower: 'Phạm Quốc Dũng', quantity: 4, borrowDate: '06/11/2026', dueDate: '15/11/2026', returnDate: '—', status: 'Đang mượn', statusType: 'primary' },
  { id: 5, code: 'PM-005', equipment: 'Bàn phím cơ Keychron K2', borrower: 'Võ Thị Giang', quantity: 2, borrowDate: '28/10/2026', dueDate: '04/11/2026', returnDate: '09/11/2026', status: 'Đã trả', statusType: 'success' },
  { id: 6, code: 'PM-006', equipment: 'Chuột không dây Logitech', borrower: 'Đặng Hữu Hải', quantity: 3, borrowDate: '02/11/2026', dueDate: '09/11/2026', returnDate: '—', status: 'Quá hạn', statusType: 'danger' },
];

export const initialFines = [
  { id: 1, code: 'PM-001', equipment: 'Laptop Dell Latitude 5420', borrower: 'Nguyễn Văn An', quantity: 2, dueDate: '10/11/2026', returnDate: '—', fineAmount: 'tạm tính 60.000 đ', isEstimated: true, status: 'Quá hạn', statusType: 'danger' },
  { id: 2, code: 'PM-005', equipment: 'Bàn phím cơ Keychron K2', borrower: 'Võ Thị Giang', quantity: 2, dueDate: '04/11/2026', returnDate: '09/11/2026', fineAmount: '50.000 đ', isEstimated: false, status: 'Đã trả', statusType: 'success' },
  { id: 3, code: 'PM-006', equipment: 'Chuột không dây Logitech', borrower: 'Đặng Hữu Hải', quantity: 3, dueDate: '09/11/2026', returnDate: '—', fineAmount: 'tạm tính 90.000 đ', isEstimated: true, status: 'Quá hạn', statusType: 'danger' },
];

export const initialStats = {
  summary: {
    totalEquipments: 126,
    currentlyBorrowed: 38,
    overdueBorrows: 5,
    inStock: 9,
  },
  topBorrowed: [
    { rank: 1, name: 'Laptop Dell Latitude 5420', percent: 100, count: 64 },
    { rank: 2, name: 'Bo mạch Arduino Uno R3', percent: 81, count: 52 },
    { rank: 3, name: 'Màn hình LG 24 inch', percent: 64, count: 41 },
    { rank: 4, name: 'Raspberry Pi 4 (4GB)', percent: 52, count: 33 },
    { rank: 5, name: 'Bàn phím cơ Keychron K2', percent: 31, count: 20 },
  ],
  idleEquipments: [
    { name: 'Bo mạch ESP32', count: '0 lượt' },
    { name: 'Màn hình cảm ứng 10 inch', count: '0 lượt' },
    { name: 'Webcam Logitech C920', count: '1 lượt' },
  ],
  monthlyStats: [
    { month: 'T1', count: 12, height: 36 },
    { month: 'T2', count: 18, height: 54 },
    { month: 'T3', count: 25, height: 75 },
    { month: 'T4', count: 22, height: 66 },
    { month: 'T5', count: 9, height: 27 },
    { month: 'T6', count: 0, height: 2 },
    { month: 'T7', count: 0, height: 2 },
    { month: 'T8', count: 30, height: 90 },
    { month: 'T9', count: 41, height: 123 },
    { month: 'T10', count: 38, height: 114 },
    { month: 'T11', count: 27, height: 81 },
    { month: 'T12', count: 5, height: 15 },
  ],
};

export const initialQueue = [
  { order: 1, name: 'Trần Thị Bình', quantity: 1, time: '09/11/2026 08:15', status: 'Sẵn sàng nhận', statusType: 'success', canCancel: true },
  { order: 2, name: 'Lê Minh Châu', quantity: 2, time: '09/11/2026 09:40', status: 'Đang chờ', statusType: 'warning', canCancel: true },
  { order: 3, name: 'Phạm Quốc Dũng', quantity: 1, time: '09/11/2026 10:02', status: 'Đang chờ', statusType: 'warning', canCancel: true },
  { order: '—', name: 'Võ Thị Giang', quantity: 1, time: '08/11/2026 16:30', status: 'Đã hủy', statusType: 'secondary', canCancel: false },
];

export const studentBorrowHistory = [
  { code: 'PM-001', equipment: 'Laptop Dell Latitude 5420', quantity: 2, borrowDate: '03/11/2026', dueDate: '10/11/2026', status: 'Quá hạn', statusType: 'danger' },
  { code: 'PM-009', equipment: 'Raspberry Pi 4 (4GB)', quantity: 1, borrowDate: '20/10/2026', dueDate: '27/10/2026', status: 'Đã trả', statusType: 'success' },
];
