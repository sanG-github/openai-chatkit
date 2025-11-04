"use client";

import { useState, useCallback } from "react";
import { CartProvider, useCart } from "@/contexts/CartContext";
import { ProductList } from "@/components/ProductList";
import { CartPage } from "@/components/CartPage";
import { ChatKitWidget } from "@/components/ChatKitWidget";
import { type FactAction } from "@/components/ChatKitPanel";
import { ToastProvider, useToast } from "@/components/ToastProvider";
import productsData from "@/products.json";

type Page = "products" | "cart";

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>("products");
  const { addToCart, cart } = useCart();
  const { showToast } = useToast();

  const handleWidgetAction = useCallback(
    async (action: FactAction) => {
      if (process.env.NODE_ENV !== "production") {
        console.info("[App] widget action", action);
      }

      if (action.type === "cart.add") {
        const product = productsData.products.find(
          (p, index) => `${index}` === action.selectedProductId || p.name === action.selectedProductId
        );

        if (product) {
          addToCart(product);
          showToast(`${product.name} added to cart`, "success");
        } else {
          showToast("Product not found", "error");
        }
      }
    },
    [addToCart, showToast]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-backdrop-blur:bg-white/80 bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/70 dark:border-slate-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                Product Store
              </h1>
              <nav className="flex gap-2">
                <button
                  onClick={() => setCurrentPage("products")}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    currentPage === "products"
                      ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  Products
                </button>
                <button
                  onClick={() => setCurrentPage("cart")}
                  className={`px-4 py-2 rounded-full font-medium transition-colors relative ${
                    currentPage === "cart"
                      ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  Cart
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        {currentPage === "products" ? (
          <ProductList products={productsData.products} />
        ) : (
          <CartPage />
        )}
      </main>

      {/* ChatKit Widget */}
      <ChatKitWidget onWidgetAction={handleWidgetAction} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </CartProvider>
  );
}
