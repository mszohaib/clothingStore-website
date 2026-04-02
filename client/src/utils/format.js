export function formatPkr(amount) {
  const n = Number(amount);
  if (Number.isNaN(n)) return '';
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(n);
}
