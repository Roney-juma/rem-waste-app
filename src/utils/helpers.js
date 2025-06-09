export const calculateTotalPrice = (priceBeforeVat, vat) =>
  Math.round(priceBeforeVat * (1 + vat / 100));

export const getSkipIcon = (size) => {
  if (size <= 8) return '🗑️';
  if (size <= 14) return '📦';
  return '🚛';
};
