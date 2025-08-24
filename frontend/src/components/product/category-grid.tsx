// src/components/product/category-grid.tsx - Versi yang diperbaiki
'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loading } from '@/components/ui/loading';
import { Category } from '@/types/product';
import api from '@/lib/api';
import { API_ENDPOINTS } from '@/lib/constants';
import { ROUTES } from '@/lib/constants';
import { ArrowRight, TrendingUp } from 'lucide-react';

// Category styling helper
const getCategoryStyle = (index: number) => {
  const styles = [
    { color: 'from-blue-500 to-blue-600', bgColor: 'from-blue-50 to-blue-100', emoji: '📱' },
    { color: 'from-pink-500 to-pink-600', bgColor: 'from-pink-50 to-pink-100', emoji: '👕' },
    { color: 'from-green-500 to-green-600', bgColor: 'from-green-50 to-green-100', emoji: '🏠' },
    { color: 'from-orange-500 to-orange-600', bgColor: 'from-orange-50 to-orange-100', emoji: '⚽' },
    { color: 'from-purple-500 to-purple-600', bgColor: 'from-purple-50 to-purple-100', emoji: '💄' },
    { color: 'from-red-500 to-red-600', bgColor: 'from-red-50 to-red-100', emoji: '🍕' },
  ];
  return styles[index % styles.length];
};

export function CategoryGrid() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get<{ data: Category[] }>(API_ENDPOINTS.CATEGORIES.LIST),
  });

  if (isLoading) {
    return (
      <>
        {/* Desktop Loading */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mt-2"></div>
            </div>
          ))}
        </div>
        {/* Mobile Loading */}
        <div className="sm:hidden space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-16 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (error || !data?.data?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Tidak ada kategori tersedia</p>
      </div>
    );
  }

  const categories = data.data.slice(0, 6); // Limit to 6 categories for homepage

  return (
    <>
      {/* Desktop & Tablet Layout */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category, index) => {
          const style = getCategoryStyle(index);
          return (
          <Link key={category.id} href={`${ROUTES.CATEGORIES}/${category.slug}`} className="group">
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
              <CardContent className="p-0">
                {/* Background with Gradient */}
                <div className={`relative aspect-square bg-gradient-to-br ${style.bgColor} p-6 flex flex-col items-center justify-center`}>
                  {/* Trending Badge */}
                  {index < 3 && (
                    <Badge className="absolute top-3 right-3 bg-gradient-to-r from-orange-400 to-red-500 text-white border-0 text-xs font-semibold shadow-lg">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                  
                  {/* Icon Container */}
                  <div className="relative mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${style.color} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <span className="text-2xl">{style.emoji}</span>
                    </div>
                    
                    {/* Floating decoration */}
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  </div>
                  
                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-black/0 group-hover:from-black/5 transition-all duration-300"></div>
                  
                  {/* Arrow Icon on Hover */}
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-gray-700" />
                    </div>
                  </div>
                </div>
                
                {/* Category Info */}
                <div className="p-4 bg-white">
                  <h3 className="font-bold text-center text-gray-900 group-hover:text-blue-600 transition-colors duration-200 text-sm lg:text-base">
                    {category.name}
                  </h3>
                  <p className="text-center text-xs text-gray-500 mt-1">
                    {category.products_count?.toLocaleString() || '0'} produk
                  </p>
                  
                  {/* Progress bar indicator */}
                  <div className="mt-3 w-full bg-gray-100 rounded-full h-1">
                    <div 
                      className={`h-1 bg-gradient-to-r ${style.color} rounded-full transition-all duration-500 group-hover:w-full`}
                      style={{ width: `${Math.min(((category.products_count || 0) / 300) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
        })}
      </div>

      {/* Mobile Layout - Different Design */}
      <div className="sm:hidden space-y-4">
        {categories.map((category, index) => {
          const style = getCategoryStyle(index);
          return (
          <Link key={category.id} href={`${ROUTES.CATEGORIES}/${category.slug}`} className="group block">
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardContent className="p-0">
                <div className={`flex items-center p-4 bg-gradient-to-r ${style.bgColor} relative`}>
                  {/* Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-br ${style.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 mr-4`}>
                    <span className="text-xl">{style.emoji}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {category.products_count?.toLocaleString() || '0'} produk
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {index < 3 && (
                          <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white border-0 text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Hot
                          </Badge>
                        )}
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </div>
                    
                    {/* Mobile Progress Bar */}
                    <div className="mt-2 w-full bg-white/50 rounded-full h-1">
                      <div 
                        className={`h-1 bg-gradient-to-r ${style.color} rounded-full transition-all duration-500`}
                        style={{ width: `${Math.min(((category.products_count || 0) / 300) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Background Pattern */}
                  <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white/20 to-transparent"></div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
        })}
      </div>

      {/* View All Categories Button */}
      <div className="text-center mt-8">
        <Link 
          href={ROUTES.CATEGORIES}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          Lihat Semua Kategori
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </>
  );
}