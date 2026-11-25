/**
 * Tiện ích chuyển đổi ngày sang định dạng dd/mm/yyyy
 * Hỗ trợ các định dạng: 'YYYY-MM-DD', ISO string, Date object, v.v.
 */
export const formatDate = (dateValue) => {
  if (!dateValue || dateValue === '—' || dateValue === 'null') {
    return '—';
  }

  try {
    if (typeof dateValue === 'string') {
      const trimmed = dateValue.trim();
      // Nếu đã có dạng dd/mm/yyyy thì trả về luôn
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(trimmed)) {
        return trimmed;
      }

      // Xử lý chuỗi YYYY-MM-DD hoặc YYYY-MM-DD HH:mm:ss
      const datePart = trimmed.split('T')[0].split(' ')[0];
      const parts = datePart.split('-');
      if (parts.length === 3 && parts[0].length === 4) {
        const [year, month, day] = parts;
        return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
      }
    }

    const d = new Date(dateValue);
    if (Number.isNaN(d.getTime())) {
      return String(dateValue);
    }

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return String(dateValue);
  }
};

/**
 * Lấy ngày theo định dạng YYYY-MM-DD cho thẻ <input type="date">
 */
export const getISODateString = (date = new Date()) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Tính ngày sau N ngày (mặc định 7 ngày cho hạn trả mượn thiết bị)
 */
export const getDefaultDueDateString = (daysToAdd = 7) => {
  const d = new Date();
  d.setDate(d.getDate() + daysToAdd);
  return getISODateString(d);
};
