import * as orderService from '../services/orderService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const create = asyncHandler(async (req, res) => {
  const userId = req.user?.id ?? null;
  const order = await orderService.createOrder(req.body, userId);
  res.status(201).json(order);
});
