export function parseImageList(imageUrl) {
  if (!imageUrl || typeof imageUrl !== 'string') return [];
  return imageUrl.split(',').map((s) => s.trim()).filter(Boolean);
}
