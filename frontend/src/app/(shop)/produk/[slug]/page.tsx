// src/app/(shop)/produk/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/product/product-detail';
import { RelatedProducts } from '@/components/product/related-products';
import { ProductReviews } from '@/components/product/product-reviews';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: 'Detail Produk',
    description: 'Lihat detail produk dan informasi lengkap',
  };
}

export default async function ProductDetailPage({ params }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Product Detail */}
      <div className="container mx-auto px-4 py-8">
        <ProductDetail slug={params.slug} />
      </div>

      {/* Product Reviews */}
      <div className="container mx-auto px-4 py-8">
        <ProductReviews slug={params.slug} />
      </div>

      {/* Related Products */}
      <div className="container mx-auto px-4 py-8">
        <RelatedProducts slug={params.slug} />
      </div>
    </div>
  );
}