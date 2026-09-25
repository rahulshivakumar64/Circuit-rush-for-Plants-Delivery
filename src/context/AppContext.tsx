import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order } from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  orders: Order[];
  placeOrder: (details: {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    deliveryTimeSlot: string;
    paymentMethod: 'upi' | 'card' | 'cod';
  }) => Order;
  updateProduct: (updated: Product) => void;
  addProduct: (newProduct: Product) => void;
  resetCatalog: () => void;

  // Navigation and UI state
  activeCategory: string; // 'all' | 'plants_gardening' | 'electronics' | 'project_kits'
  setActiveCategory: (cat: string) => void;
  activeSubcategory: string | null;
  setActiveSubcategory: (sub: string | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Modals & Panels
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isQuizOpen: boolean;
  setIsQuizOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  lastOrder: Order | null;
  setLastOrder: (order: Order | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const PRODUCTS_STORAGE_KEY = 'circuitrush_products_v2';
const CART_STORAGE_KEY = 'circuitrush_cart_v2';
const ORDERS_STORAGE_KEY = 'circuitrush_orders_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const placeOrder = (details: {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    deliveryTimeSlot: string;
    paymentMethod: 'upi' | 'card' | 'cod';
  }): Order => {
    const deliveryFee = cartSubtotal >= 499 ? 0 : 39;
    const discount = cartSubtotal >= 999 ? 100 : 0;
    const total = cartSubtotal + deliveryFee - discount;

    const newOrder: Order = {
      id: `CR-${Date.now().toString().slice(-6)}`,
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee,
      discount,
      total,
      customerName: details.customerName,
      customerPhone: details.customerPhone,
      customerAddress: details.customerAddress,
      deliveryTimeSlot: details.deliveryTimeSlot,
      paymentMethod: details.paymentMethod,
      status: 'Order Placed',
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    return newOrder;
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    if (selectedProductForDetail?.id === updated.id) {
      setSelectedProductForDetail(updated);
    }
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const resetCatalog = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem(PRODUCTS_STORAGE_KEY);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        orders,
        placeOrder,
        updateProduct,
        addProduct,
        resetCatalog,
        activeCategory,
        setActiveCategory,
        activeSubcategory,
        setActiveSubcategory,
        searchQuery,
        setSearchQuery,
        selectedProductForDetail,
        setSelectedProductForDetail,
        isCartOpen,
        setIsCartOpen,
        isQuizOpen,
        setIsQuizOpen,
        isAdminOpen,
        setIsAdminOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastOrder,
        setLastOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
