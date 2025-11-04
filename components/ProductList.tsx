"use client";

import { useCart } from "@/contexts/CartContext";
import { useToast } from "./ToastProvider";
import type { Product } from "@/contexts/CartContext";

interface ProductListProps {
  products: Product[];
}

const FALLBACK_IMG = "https://via.placeholder.com/600x600.png?text=Product";

export function ProductList({ products }: ProductListProps) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAdd = (product: Product) => {
    addToCart(product);
    showToast(`${product.name} added to cart`, "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="group relative rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-square bg-slate-50 dark:bg-slate-800 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMG;
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1 line-clamp-1">
                {product.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2 min-h-[1.5rem]">
                {product.subtitle}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {product.price}
                </span>
                <button
                  onClick={() => handleAdd(product)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


