// src/app/page.tsx - Versi yang diperbaiki dengan desain lebih rapi
import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight, Star, Truck, Shield, Headphones, Zap, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loading } from '@/components/ui/loading';
import { FeaturedProducts } from '@/components/product/featured-products';
import { CategoryGrid } from '@/components/product/category-grid';
import { ROUTES } from '@/lib/constants';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Diperbaiki dengan gradien dan animasi */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-800/80" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <Badge className="bg-white/10 backdrop-blur text-white border-white/20 px-4 py-2">
                  ✨ Platform E-Commerce Terpercaya
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Belanja Online
                  <span className="block text-blue-200">Mudah & Aman</span>
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
                  Temukan ribuan produk berkualitas dengan harga terbaik. 
                  Gratis ongkir ke seluruh Indonesia untuk pembelian minimal Rp 100.000.
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl" asChild>
                  <Link href={ROUTES.PRODUCTS}>
                    <Zap className="mr-2 h-5 w-5" />
                    Mulai Belanja
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur"
                >
                  Lihat Promo Hari Ini
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-sm text-blue-200">Produk</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">100K+</div>
                  <div className="text-sm text-blue-200">Pelanggan</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">4.8★</div>
                  <div className="text-sm text-blue-200">Rating</div>
                </div>
              </div>
            </div>
            
            {/* Hero Image/Animation */}
            <div className="relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Main Circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-full backdrop-blur border border-white/20" />
                
                {/* Floating Cards */}
                <div className="absolute top-10 left-10 bg-white rounded-xl p-4 shadow-xl animate-bounce">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      📱
                    </div>
                    <div>
                      <div className="font-semibold text-sm">iPhone 15</div>
                      <div className="text-xs text-gray-500">Rp 18.999.000</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-10 right-10 bg-white rounded-xl p-4 shadow-xl animate-bounce delay-500">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      ⚡
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Gratis Ongkir</div>
                      <div className="text-xs text-gray-500">Seluruh Indonesia</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-1/2 right-0 bg-white rounded-xl p-4 shadow-xl animate-bounce delay-1000">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      🔒
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Aman</div>
                      <div className="text-xs text-gray-500">100%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 120" className="w-full h-16 text-white fill-current">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section - Diperbaiki dengan desain card yang lebih modern */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Kenapa Pilih Kami</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Pengalaman Belanja Terbaik
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Kami berkomitmen memberikan layanan terbaik untuk kepuasan pelanggan
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Gratis Ongkir</h3>
                <p className="text-gray-600 leading-relaxed">
                  Gratis ongkos kirim ke seluruh Indonesia untuk pembelian minimal Rp 100.000
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Pembayaran Aman</h3>
                <p className="text-gray-600 leading-relaxed">
                  Sistem pembayaran yang aman dan terpercaya dengan berbagai pilihan metode
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Headphones className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Customer Service 24/7</h3>
                <p className="text-gray-600 leading-relaxed">
                  Tim customer service yang siap membantu Anda kapan saja
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Kualitas Terjamin</h3>
                <p className="text-gray-600 leading-relaxed">
                  Produk berkualitas tinggi dengan garansi resmi dari brand ternama
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section - Diperbaiki dengan layout yang lebih rapi */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Jelajahi Kategori</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Kategori Populer
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Temukan produk yang Anda butuhkan dari berbagai kategori pilihan
            </p>
          </div>
          
          <Suspense fallback={<CategoryLoadingSkeleton />}>
            <CategoryGrid />
          </Suspense>
        </div>
      </section>

      {/* Featured Products Section - Diperbaiki dengan spacing yang lebih baik */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <Badge className="mb-4">Produk Pilihan</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Produk Unggulan
              </h2>
              <p className="text-gray-600 text-lg">
                Produk terpilih dengan kualitas terbaik dan harga terjangkau
              </p>
            </div>
            <Button variant="outline" size="lg" asChild className="hidden lg:flex">
              <Link href={ROUTES.PRODUCTS}>
                Lihat Semua
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <Suspense fallback={<ProductLoadingSkeleton />}>
            <FeaturedProducts />
          </Suspense>
          
          {/* Mobile View All Button */}
          <div className="text-center mt-12 lg:hidden">
            <Button variant="outline" size="lg" asChild>
              <Link href={ROUTES.PRODUCTS}>
                Lihat Semua Produk
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section - Baru ditambahkan */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4">Dipercaya Pelanggan</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Mengapa 100K+ Pelanggan Memilih Kami
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">100,000+ Pelanggan Puas</h3>
              <p className="text-gray-600">Bergabung dengan ribuan pelanggan yang telah merasakan layanan terbaik kami</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Rating 4.8/5</h3>
              <p className="text-gray-600">Kepuasan pelanggan adalah prioritas utama kami dalam setiap transaksi</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Penghargaan E-Commerce Terbaik</h3>
              <p className="text-gray-600">Dipercaya sebagai platform e-commerce terpercaya di Indonesia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Diperbaiki dengan design yang lebih menarik */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="bg-white/20 text-white border-white/30 mb-6">
              Newsletter
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Dapatkan Update Terbaru
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Berlangganan newsletter kami dan dapatkan informasi promo eksklusif, 
              produk baru, dan tips menarik lainnya langsung di inbox Anda.
            </p>
            
            <div className="max-w-md mx-auto">
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  className="flex-1 px-6 py-4 rounded-xl border-0 bg-white/10 backdrop-blur text-white placeholder-blue-200 focus:ring-2 focus:ring-white/50 focus:outline-none"
                  required
                />
                <Button 
                  type="submit" 
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold"
                >
                  Berlangganan
                </Button>
              </form>
              <p className="text-sm text-blue-200 mt-4">
                *Kami menghormati privasi Anda dan tidak akan mengirim spam
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Loading skeletons yang diperbaiki
function CategoryLoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl mb-4"></div>
          <div className="h-4 bg-gray-200 rounded-lg w-3/4 mx-auto"></div>
          <div className="h-3 bg-gray-200 rounded-lg w-1/2 mx-auto mt-2"></div>
        </div>
      ))}
    </div>
  );
}

function ProductLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded-lg w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}