/**
 * Tiện ích ánh xạ và chuẩn hóa danh mục thiết bị giữa backend và giao diện
 */
export const CATEGORY_MAP = {
  laptop: 'Laptop',
  man_hinh: 'Màn hình',
  mach_dien_tu: 'Bo mạch điện tử',
  phu_kien: 'Phụ kiện',
};

export const CATEGORY_OPTIONS = [
  { value: 'laptop', label: 'Laptop' },
  { value: 'man_hinh', label: 'Màn hình' },
  { value: 'mach_dien_tu', label: 'Bo mạch điện tử' },
  { value: 'phu_kien', label: 'Phụ kiện' },
];

export const getCategoryLabel = (category) => {
  if (!category) return 'Chưa phân loại';
  const key = String(category).toLowerCase().trim();
  return CATEGORY_MAP[key] || category;
};

export const normalizeCategoryKey = (category) => {
  if (!category) return 'laptop';
  const val = String(category).toLowerCase().trim();
  if (val === 'laptop') return 'laptop';
  if (val.includes('màn') || val.includes('man')) return 'man_hinh';
  if (val.includes('mạch') || val.includes('mach') || val.includes('bo')) return 'mach_dien_tu';
  if (val.includes('phụ') || val.includes('phu')) return 'phu_kien';
  return val;
};
