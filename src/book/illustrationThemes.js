export const illustrationThemes = Object.freeze([
  null,
  { id: 'income', label: 'Thu nhập và tăng trưởng' },
  { id: 'stakeholders', label: 'Mạng lưới các chủ thể kinh tế' },
  { id: 'balance', label: 'Cân bằng những lợi ích khác nhau' },
  { id: 'platform', label: 'Chuyến xe và phân chia doanh thu' },
  { id: 'startup', label: 'Cộng tác và phát triển sản phẩm' },
  null,
]);

export const getIllustrationTheme = page => illustrationThemes[page] || null;
