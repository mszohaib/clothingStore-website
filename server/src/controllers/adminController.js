import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import * as adminStatsService from '../services/adminStatsService.js';
import * as productService from '../services/productService.js';
import * as orderService from '../services/orderService.js';

const PRODUCT_FIELDS = [
  'title',
  'slug',
  'category',
  'brand',
  'price',
  'size',
  'condition',
  'description',
  'image_url',
  'status',
  'badge',
  'featured',
];

function pickProductBody(body, partial = false) {
  const out = {};
  for (const key of PRODUCT_FIELDS) {
    if (body[key] !== undefined) out[key] = body[key];
  }
  if (!partial) {
    if (!out.title || !out.slug || !out.category) {
      throw new ApiError(400, 'title, slug, and category are required');
    }
    if (out.price === undefined || out.price === '') {
      throw new ApiError(400, 'price is required');
    }
  }
  return out;
}

export const stats = asyncHandler(async (req, res) => {
  const data = await adminStatsService.getDashboardStats();
  res.json(data);
});

export const listProducts = asyncHandler(async (req, res) => {
  const products = await productService.listProductsAdmin();
  res.json(products);
});

export const createProduct = asyncHandler(async (req, res) => {
  const payload = pickProductBody(req.body, false);
  const product = await productService.createProduct(payload);
  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const patch = pickProductBody(req.body, true);
  if (Object.keys(patch).length === 0) {
    throw new ApiError(400, 'No valid fields to update');
  }
  const product = await productService.updateProduct(req.params.id, patch);
  res.json(product);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const result = await productService.deleteProduct(req.params.id);
  res.json(result);
});

export const listOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.listOrdersAdmin();
  res.json(orders);
});

export const patchOrder = asyncHandler(async (req, res) => {
  const { order_status } = req.body;
  if (!order_status) {
    throw new ApiError(400, 'order_status is required');
  }
  const order = await orderService.updateOrderStatus(req.params.id, order_status);
  res.json(order);
});
