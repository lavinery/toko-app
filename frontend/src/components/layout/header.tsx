// src/components/layout/header.tsx - Versi yang diperbaiki
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  User,
  ChevronDown,
  Heart,
  Bell,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useCart } from '@/hooks/use-cart';
import { useUIStore } from '@/store/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { APP_NAME, ROUTES } from '@/lib/constants';

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const { 
    isMobileMenuOpen, 
    toggleMobileMenu, 
    closeMobileMenu,
    isSearchOpen,
    toggleSearch,
    closeSearch
  } = useUIStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/product?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
    closeMobileMenu();
  };

  const navLinks = [
    { href: ROUTES.HOME, label: 'Beranda' },
    { href: ROUTES.PRODUCTS, label: 'Produk' },
    { href: ROUTES.CATEGORIES, label: 'Kategori' },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-lg border-gray-200/50' 
        : 'bg-white/80 backdrop-blur-sm border-gray-200'
    }`}>
      <div className="container mx-auto px-4">
        {/* Top Bar - Promo/Announcement */}
        <div className="hidden lg:block py-2 border-b border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span>Gratis Ongkir untuk pembelian minimal Rp 100.000</span>
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <Link href="/bantuan" className="hover:text-blue-600 transition-colors">
                Bantuan
              </Link>
              <Link href="/kontak" className="hover:text-blue-600 transition-colors">
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex h-16 lg:h-18 items-center justify-between">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse" />
            </div>
            <span className="font-bold text-xl text-gray-900 hidden sm:block">{APP_NAME}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-gray-600 hover:text-gray-900 font-medium transition-all duration-200 py-2 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            
            {/* Special Promo Link */}
            <Link
              href="/promo"
              className="relative text-orange-600 hover:text-orange-700 font-medium transition-all duration-200 py-2 group"
            >
              <span className="flex items-center gap-1">
                <Sparkles className="h-4 w-4" />
                Promo
              </span>
              <Badge className="absolute -top-2 -right-6 bg-red-500 text-white text-xs px-1.5 py-0.5 animate-pulse">
                HOT
              </Badge>
            </Link>
          </nav>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <Input
                type="search"
                placeholder="Cari produk, brand, atau kategori..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-12 rounded-xl border-2 border-gray-200 bg-gray-50/50 focus:border-blue-500 focus:bg-white transition-all duration-200"
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                <Button
                  type="submit"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 rounded-lg h-8 px-4"
                >
                  Cari
                </Button>
              </div>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSearch}
              className="lg:hidden hover:bg-gray-100 rounded-xl"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Notifications - Desktop Only */}
            {isAuthenticated && (
              <Button variant="ghost" size="icon" className="hidden lg:flex relative hover:bg-gray-100 rounded-xl">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs p-0">
                  3
                </Badge>
              </Button>
            )}

            {/* Wishlist */}
            {isAuthenticated && (
              <Button variant="ghost" size="icon" asChild className="hidden sm:flex hover:bg-gray-100 rounded-xl relative">
                <Link href="/wishlist">
                  <Heart className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-pink-500 text-white text-xs p-0">
                    2
                  </Badge>
                </Link>
              </Button>
            )}

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 rounded-xl" asChild>
              <Link href={ROUTES.CART}>
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs p-0 flex items-center justify-center shadow-lg animate-pulse">
                    {itemCount > 99 ? '99+' : itemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 hover:bg-gray-100 rounded-xl px-3 py-2 h-auto"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-sm font-medium text-gray-900 truncate max-w-24">
                      {user?.name}
                    </div>
                    <div className="text-xs text-gray-500">Customer</div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </Button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white py-2 shadow-xl z-10">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="font-medium text-gray-900">{user?.name}</div>
                      <div className="text-sm text-gray-500">{user?.email}</div>
                    </div>
                    
                    <div className="py-1">
                      <Link
                        href={ROUTES.ACCOUNT}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="h-4 w-4 mr-3" />
                        Akun Saya
                      </Link>
                      <Link
                        href={ROUTES.ORDERS}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-3" />
                        Pesanan
                      </Link>
                      <Link
                        href="/wishlist"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Heart className="h-4 w-4 mr-3" />
                        Wishlist
                      </Link>
                    </div>
                    
                    <div className="py-1 border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Keluar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Button variant="ghost" asChild className="hover:bg-gray-100 rounded-xl">
                  <Link href={ROUTES.LOGIN}>Masuk</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg">
                  <Link href={ROUTES.REGISTER}>Daftar</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="lg:hidden hover:bg-gray-100 rounded-xl"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-gray-200 py-4 lg:hidden">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="search"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-12 rounded-xl border-2 border-gray-200 bg-gray-50"
                autoFocus
              />
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 py-6 lg:hidden bg-white/95 backdrop-blur">
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium transition-colors rounded-lg mx-2"
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              ))}
              
              <Link
                href="/promo"
                className="block px-4 py-3 text-orange-600 hover:text-orange-700 hover:bg-orange-50 font-medium transition-colors rounded-lg mx-2"
                onClick={closeMobileMenu}
              >
                🔥 Promo Spesial
              </Link>
              
              <hr className="my-4 mx-4" />
              
              {isAuthenticated ? (
                <div className="space-y-1">
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg mx-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user?.name}</div>
                      <div className="text-sm text-gray-500">Customer</div>
                    </div>
                  </div>
                  
                  <Link
                    href={ROUTES.CART}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg mx-2"
                    onClick={closeMobileMenu}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Keranjang ({itemCount})</span>
                  </Link>
                  
                  <Link
                    href="/wishlist"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg mx-2"
                    onClick={closeMobileMenu}
                  >
                    <Heart className="h-5 w-5" />
                    <span>Wishlist</span>
                  </Link>
                  
                  <Link
                    href={ROUTES.ACCOUNT}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg mx-2"
                    onClick={closeMobileMenu}
                  >
                    <User className="h-5 w-5" />
                    <span>Akun Saya</span>
                  </Link>
                  
                  <Link
                    href={ROUTES.ORDERS}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg mx-2"
                    onClick={closeMobileMenu}
                  >
                    <span>📦</span>
                    <span>Pesanan</span>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors rounded-lg mx-2"
                  >
                    <span>🚪</span>
                    <span>Keluar</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3 px-2">
                  <Link
                    href={ROUTES.CART}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg"
                    onClick={closeMobileMenu}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Keranjang ({itemCount})</span>
                  </Link>
                  
                  <Link
                    href={ROUTES.LOGIN}
                    className="block w-full px-4 py-3 text-center bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium transition-colors rounded-lg"
                    onClick={closeMobileMenu}
                  >
                    Masuk
                  </Link>
                  
                  <Link
                    href={ROUTES.REGISTER}
                    className="block w-full px-4 py-3 text-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-colors rounded-lg shadow-lg"
                    onClick={closeMobileMenu}
                  >
                    Daftar Sekarang
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}