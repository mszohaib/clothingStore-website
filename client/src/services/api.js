const base = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:5000/api/v1';

export function getApiBase() {
  return base;
}

export async function apiGet(path, options = {}) {
  const res = await fetch(`${base}${path}`, {
    ...options,
    headers: { Accept: 'application/json', ...options.headers },
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const err = new Error(data?.error || res.statusText);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export async function apiPost(path, body, options = {}) {
  const res = await fetch(`${base}${path}`, {
    method: 'POST',
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const err = new Error(data?.error || res.statusText);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}
