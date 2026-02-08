'use client';

import type { ReactNode } from 'react';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { CartProvider } from '@/features/cart/CartContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}
