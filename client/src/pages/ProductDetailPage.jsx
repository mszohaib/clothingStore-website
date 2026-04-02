import { useParams } from 'react-router-dom';
import { PagePlaceholder } from './PagePlaceholder.jsx';

export function ProductDetailPage() {
  const { slug } = useParams();
  return (
    <PagePlaceholder
      title={slug ? `Product: ${slug}` : 'Product'}
      description="Gallery and add to cart in Step 7."
    />
  );
}
