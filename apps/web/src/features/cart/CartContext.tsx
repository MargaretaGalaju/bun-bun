'use client';

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { ProductDto } from '@bun-bun/shared';

// ── Types ───────────────────────────────────────────────────

export interface CartItem {
  productId: string;
  qty: number;
  titleRo: string;
  titleRu: string;
  price: number;
  image?: string;
}

interface CartState {
  items: Record<string, CartItem>;
}

type CartAction =
  | { type: 'ADD_ITEM'; product: ProductDto; qty: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'SET_QTY'; productId: string; qty: number }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE'; items: Record<string, CartItem> };

interface CartContextValue {
  items: Record<string, CartItem>;
  itemList: CartItem[];
  itemCount: number;
  total: number;
  addItem: (product: ProductDto, qty?: number) => void;
  removeItem: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clearCart: () => void;
}

// ── Reducer ─────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items[action.product.id];
      const newQty = (existing?.qty || 0) + action.qty;
      return {
        items: {
          ...state.items,
          [action.product.id]: {
            productId: action.product.id,
            qty: newQty,
            titleRo: action.product.titleRo,
            titleRu: action.product.titleRu,
            price: action.product.price,
            image: action.product.images?.[0]?.url,
          },
        },
      };
    }
    case 'REMOVE_ITEM': {
      const { [action.productId]: _, ...rest } = state.items;
      return { items: rest };
    }
    case 'SET_QTY': {
      const item = state.items[action.productId];
      if (!item) return state;
      if (action.qty <= 0) {
        const { [action.productId]: _, ...rest } = state.items;
        return { items: rest };
      }
      return {
        items: {
          ...state.items,
          [action.productId]: { ...item, qty: action.qty },
        },
      };
    }
    case 'CLEAR':
      return { items: {} };
    case 'HYDRATE':
      return { items: action.items };
    default:
      return state;
  }
}

// ── Storage ─────────────────────────────────────────────────

const STORAGE_KEY = 'bun-bun-cart';

function loadCart(): Record<string, CartItem> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, CartItem>;
  } catch {
    return {};
  }
}

function saveCart(items: Record<string, CartItem>) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* quota exceeded — ignore */
  }
}

// ── Context ─────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: {} });

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = loadCart();
    if (Object.keys(stored).length > 0) {
      dispatch({ type: 'HYDRATE', items: stored });
    }
  }, []);

  // Persist to localStorage on every change (skip initial empty state)
  useEffect(() => {
    saveCart(state.items);
  }, [state.items]);

  const addItem = useCallback((product: ProductDto, qty = 1) => {
    dispatch({ type: 'ADD_ITEM', product, qty });
  }, []);

  const removeItem = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', productId });
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    dispatch({ type: 'SET_QTY', productId, qty });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const itemList = Object.values(state.items);
  const itemCount = itemList.reduce((sum, item) => sum + item.qty, 0);
  const total = itemList.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{ items: state.items, itemList, itemCount, total, addItem, removeItem, setQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within <CartProvider>');
  }
  return ctx;
}
