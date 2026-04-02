const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

export function validateEmail(value) {
  const s = String(value ?? '').trim();
  if (!s) return 'Email is required';
  if (!EMAIL_RE.test(s)) return 'Enter a valid email address';
  return '';
}

export function validatePassword(value, { min = 8 } = {}) {
  const s = String(value ?? '');
  if (!s) return 'Password is required';
  if (s.length < min) return `Use at least ${min} characters`;
  return '';
}

export function validateName(value) {
  const s = String(value ?? '').trim();
  if (!s) return 'Name is required';
  if (s.length < 2) return 'Name is too short';
  return '';
}

export function validatePhone(value) {
  const raw = String(value ?? '').trim();
  if (!raw) return 'Phone is required';
  const digits = raw.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) return 'Enter a valid phone number';
  return '';
}

export function validateAddress(value) {
  const s = String(value ?? '').trim();
  if (!s) return 'Address is required';
  if (s.length < 8) return 'Please enter a full street address';
  return '';
}

export function validateCity(value) {
  const s = String(value ?? '').trim();
  if (!s) return 'City is required';
  if (s.length < 2) return 'City is too short';
  return '';
}

export function validateMessage(value) {
  const s = String(value ?? '').trim();
  if (!s) return 'Message is required';
  if (s.length < 10) return 'Please write at least a few sentences';
  return '';
}
