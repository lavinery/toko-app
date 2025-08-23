// src/app/cart/page.tsx
import { Metadata } from 'next';
import { CartPage } from '@/components/cart/cart-page';

export const metadata: Metadata = {
  title: 'Keranjang Belanja',
  description: 'Lihat dan kelola item dalam keranjang belanja Anda',
};

export default function Cart() {
  return <CartPage />;
}