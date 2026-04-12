import { getSupabaseAdmin } from '../config/supabaseAdmin.js';
import { ApiError } from '../utils/ApiError.js';

const ALLOWED_PAYMENT = new Set([
  'bank_transfer',
  'digital_wallet',
  'card_placeholder',
  // legacy values still accepted if old clients submit them
  'nayapay',
  'easypaisa',
]);

const ALLOWED_STATUS = new Set(['pending', 'confirmed', 'shipped', 'cancelled']);

export async function createOrder(body, userId = null) {
  const {
    customer_name,
    email,
    phone,
    address,
    city,
    items,
    total_amount,
    payment_method,
  } = body;

  if (!customer_name || !email || !phone || !address || !city) {
    throw new ApiError(400, 'Missing shipping fields');
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw new ApiError(400, 'Order must include at least one item');
  }

  if (typeof total_amount !== 'number' && typeof total_amount !== 'string') {
    throw new ApiError(400, 'Invalid total_amount');
  }

  const total = Number(total_amount);
  if (Number.isNaN(total) || total < 0) {
    throw new ApiError(400, 'Invalid total_amount');
  }

  if (!payment_method || !ALLOWED_PAYMENT.has(payment_method)) {
    throw new ApiError(400, 'Invalid payment_method');
  }

  const supabase = getSupabaseAdmin();
  const row = {
    user_id: userId,
    customer_name: String(customer_name).trim(),
    email: String(email).trim(),
    phone: String(phone).trim(),
    address: String(address).trim(),
    city: String(city).trim(),
    items,
    total_amount: total,
    payment_method,
    order_status: 'pending',
  };

  const { data, error } = await supabase.from('orders').insert(row).select('*').single();

  if (error) {
    throw new ApiError(500, 'Failed to create order', error.message);
  }

  return data;
}

export async function listOrdersAdmin() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });

  if (error) {
    throw new ApiError(500, 'Failed to fetch orders', error.message);
  }

  return data || [];
}

export async function updateOrderStatus(id, order_status) {
  if (!ALLOWED_STATUS.has(order_status)) {
    throw new ApiError(400, 'Invalid order_status');
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('orders')
    .update({ order_status })
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw new ApiError(500, 'Failed to update order', error.message);
  }

  if (!data) {
    throw new ApiError(404, 'Order not found');
  }

  return data;
}
