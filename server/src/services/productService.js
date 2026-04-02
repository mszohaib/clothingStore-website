import { getSupabaseAdmin } from '../config/supabaseAdmin.js';
import { ApiError } from '../utils/ApiError.js';

const SORT_MAP = {
  newest: { column: 'created_at', ascending: false },
  oldest: { column: 'created_at', ascending: true },
  price_asc: { column: 'price', ascending: true },
  price_desc: { column: 'price', ascending: false },
  title_asc: { column: 'title', ascending: true },
};

function parseBool(v) {
  if (v === undefined || v === '') return undefined;
  if (v === 'true' || v === '1') return true;
  if (v === 'false' || v === '0') return false;
  return undefined;
}

export async function listProducts(query) {
  const supabase = getSupabaseAdmin();
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 24));
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const sortKey = query.sort && SORT_MAP[query.sort] ? query.sort : 'newest';
  const { column, ascending } = SORT_MAP[sortKey];

  let q = supabase.from('products').select('*', { count: 'exact' });

  if (query.category) q = q.eq('category', query.category);
  if (query.brand) q = q.ilike('brand', `%${query.brand}%`);
  if (query.size) q = q.eq('size', query.size);
  if (query.condition) q = q.eq('condition', query.condition);
  if (query.status) q = q.eq('status', query.status);
  if (query.badge) q = q.eq('badge', query.badge);
  const featured = parseBool(query.featured);
  if (featured === true) q = q.eq('featured', true);

  const minPrice = query.minPrice != null && query.minPrice !== '' ? Number(query.minPrice) : null;
  const maxPrice = query.maxPrice != null && query.maxPrice !== '' ? Number(query.maxPrice) : null;
  if (minPrice != null && !Number.isNaN(minPrice)) q = q.gte('price', minPrice);
  if (maxPrice != null && !Number.isNaN(maxPrice)) q = q.lte('price', maxPrice);

  if (query.search && String(query.search).trim()) {
    const raw = String(query.search).trim().replace(/%/g, '').replace(/,/g, '');
    if (raw) {
      const term = `%${raw}%`;
      q = q.or(`title.ilike.${term},brand.ilike.${term},description.ilike.${term}`);
    }
  }

  q = q.order(column, { ascending }).range(from, to);

  const { data, error, count } = await q;

  if (error) {
    throw new ApiError(500, 'Failed to fetch products', error.message);
  }

  return {
    data: data || [],
    meta: { page, limit, total: count ?? 0, totalPages: Math.ceil((count || 0) / limit) || 0 },
  };
}

export async function getProductBySlug(slug) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('products').select('*').eq('slug', slug).maybeSingle();

  if (error) {
    throw new ApiError(500, 'Failed to fetch product', error.message);
  }

  if (!data) {
    throw new ApiError(404, 'Product not found');
  }

  return data;
}

export async function createProduct(payload) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('products').insert(payload).select('*').single();

  if (error) {
    if (error.code === '23505') {
      throw new ApiError(409, 'Slug already exists');
    }
    throw new ApiError(500, 'Failed to create product', error.message);
  }

  return data;
}

export async function updateProduct(id, patch) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('products').update(patch).eq('id', id).select('*').single();

  if (error) {
    throw new ApiError(500, 'Failed to update product', error.message);
  }

  if (!data) {
    throw new ApiError(404, 'Product not found');
  }

  return data;
}

export async function deleteProduct(id) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('products').delete().eq('id', id).select('id').maybeSingle();

  if (error) {
    throw new ApiError(500, 'Failed to delete product', error.message);
  }

  if (!data) {
    throw new ApiError(404, 'Product not found');
  }

  return { deleted: true };
}

export async function listProductsAdmin() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });

  if (error) {
    throw new ApiError(500, 'Failed to fetch products', error.message);
  }

  return data || [];
}
