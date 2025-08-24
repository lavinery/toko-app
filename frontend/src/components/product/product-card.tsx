// src/components/product/product-card.tsx - Versi yang diperbaiki
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Heart, ShoppingCart, Star, Eye, Zap } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.available_stock) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Produk ditambahkan ke keranjang!');
    }, 1000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Implement quick view modal
    console.log('Quick view:', product.name);
  };

  const discountPercentage = product.compare_price 
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  return (
    <Card 
      className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`${ROUTES.PRODUCTS}/${product.slug}`}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {/* Product Image with Placeholder */}
          <div className="w-full h-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center relative">
            {product.primary_image?.url ? (
              <Image
                src={product.primary_image.url}
                alt={product.primary_image.alt_text || product.name}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-6xl opacity-40">
                {product.name.includes('iPhone') && '📱'}
                {product.name.includes('Samsung') && '📱'}
                {product.name.includes('MacBook') && '💻'}
                {product.name.includes('AirPods') && '🎧'}
                {!['iPhone', 'Samsung', 'MacBook', 'AirPods'].some(keyword => product.name.includes(keyword)) && '📦'}
              </div>
            )}
            
            {/* Overlay Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/10 to-transparent transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`} />
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.is_featured && (
              <Badge className="text-xs font-semibold bg-gradient-to-r from-orange-400 to-orange-500 border-0 shadow-lg">
                ⭐ Unggulan
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge className="text-xs font-semibold bg-gradient-to-r from-red-500 to-red-600 border-0 shadow-lg text-white">
                -{discountPercentage}%
              </Badge>
            )}
            {!product.available_stock && (
              <Badge variant="secondary" className="text-xs bg-gray-900/80 text-white">
                Habis
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`}>
            <button
              onClick={handleWishlist}
              className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:scale-110 transition-all group"
            >
              <Heart 
                className={`h-4 w-4 transition-colors ${
                  isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 group-hover:text-red-500'
                }`} 
              />
            </button>
            
            <button
              onClick={handleQuickView}
              className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:scale-110 transition-all group"
            >
              <Eye className="h-4 w-4 text-gray-600 group-hover:text-blue-500" />
            </button>
          </div>

          {/* Quick Add Button - Appears on Hover */}
          <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${
            isHovered && product.available_stock 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}>
            <Button
              onClick={handleAddToCart}
              disabled={!product.available_stock || isLoading}
              className="w-full bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white shadow-lg border-0 h-10"
              size="sm"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.available_stock ? 'Tambah ke Keranjang' : 'Stok Habis'}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-5 space-y-3">
          {/* Category */}
          {product.categories.length > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs text-blue-600 border-blue-200 bg-blue-50">
                {product.categories[0].name}
              </Badge>
              {product.is_featured && (
                <Badge variant="outline" className="text-xs text-orange-600 border-orange-200 bg-orange-50">
                  <Zap className="h-3 w-3 mr-1" />
                  Trending
                </Badge>
              )}
            </div>
          )}

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Rating & Reviews */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 font-medium">(4.5)</span>
            </div>
            <span className="text-xs text-gray-400">128 terjual</span>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-end gap-2">
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.compare_price && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.compare_price)}
                </span>
              )}
            </div>
            
            {/* Additional Info */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                Stok: {product.available_stock}
              </span>
              {product.weight && (
                <span className="text-gray-400">
                  {product.weight < 1000 ? `${product.weight}g` : `${(product.weight/1000).toFixed(1)}kg`}
                </span>
              )}
            </div>
          </div>

          {/* Free Shipping Badge */}
          {product.price >= 100000 && (
            <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full w-fit">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
              </svg>
              Gratis Ongkir
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}