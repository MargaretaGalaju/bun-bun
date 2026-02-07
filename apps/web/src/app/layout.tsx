import type { ReactNode } from 'react';

// Minimal root layout — locale-specific layout is in [locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
