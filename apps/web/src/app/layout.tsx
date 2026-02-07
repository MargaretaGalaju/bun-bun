import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Marketplace',
  description: 'Marketplace MVP',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '1rem 2rem', borderBottom: '1px solid #eee' }}>
          <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <a href="/" style={{ fontWeight: 'bold', fontSize: '1.2rem', textDecoration: 'none' }}>
              Marketplace
            </a>
            <a href="/products">Products</a>
            <a href="/admin">Admin</a>
          </nav>
        </header>
        <main style={{ padding: '2rem' }}>{children}</main>
      </body>
    </html>
  );
}
