import { getSupabaseAdmin } from '../config/supabaseAdmin.js';
import { ApiError } from '../utils/ApiError.js';

export async function getDashboardStats() {
  const supabase = getSupabaseAdmin();

  const productsRes = await supabase.from('products').select('id, status, featured', { count: 'exact' });

  if (productsRes.error) {
    throw new ApiError(500, 'Failed to load product stats', productsRes.error.message);
  }

  const ordersRes = await supabase.from('orders').select('id', { count: 'exact', head: true });

  if (ordersRes.error) {
    throw new ApiError(500, 'Failed to load order stats', ordersRes.error.message);
  }

  const rows = productsRes.data || [];
  const soldCount = rows.filter((p) => p.status === 'sold').length;
  const featuredCount = rows.filter((p) => p.featured).length;

  const recentOrders = await supabase
    .from('orders')
    .select('id, customer_name, email, total_amount, order_status, created_at')
    .order('created_at', { ascending: false })
    .limit(8);

  if (recentOrders.error) {
    throw new ApiError(500, 'Failed to load recent orders', recentOrders.error.message);
  }

  return {
    total_products: productsRes.count ?? rows.length,
    total_orders: ordersRes.count ?? 0,
    sold_items_count: soldCount,
    featured_items_count: featuredCount,
    recent_orders: recentOrders.data || [],
  };
}
