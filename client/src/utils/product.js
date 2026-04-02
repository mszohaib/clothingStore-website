export function parseImageList(imageUrl) {
  if (!imageUrl || typeof imageUrl !== 'string') return [];
  return imageUrl.split(',').map((s) => s.trim()).filter(Boolean);
}

/** First image URL for cart cards and thumbnails when `image_url` stores comma-separated links. */
export function getPrimaryImageUrl(imageUrl) {
  const list = parseImageList(imageUrl);
  return list[0] || '';
}
