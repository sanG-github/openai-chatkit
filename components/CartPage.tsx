"use client";

import { useCart } from "@/contexts/CartContext";

const FALLBACK_IMG = "https://via.placeholder.com/600x600.png?text=Product";

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } =
    useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Your cart is empty
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Add some products to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Shopping Cart
        </h1>
        <button
          onClick={clearCart}
          className="px-4 py-2 rounded-full border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
        >
          Clear Cart
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 flex items-center gap-4"
          >
            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-xl flex-shrink-0 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMG;
                }}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {item.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {item.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-lg border border-slate-300 dark:border-slate-600 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium text-slate-900 dark:text-slate-100">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-lg border border-slate-300 dark:border-slate-600 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  +
                </button>
              </div>
              <div className="w-24 text-right">
                <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  ${(parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-3 py-1 rounded-full border border-rose-300 dark:border-rose-700 text-rose-700 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-900/20 font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Total:
          </span>
          <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {getTotalPrice()}
          </span>
        </div>
        <button className="w-full px-6 py-3 rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 font-medium transition-colors">
          Checkout
        </button>
      </div>
    </div>
  );
}

