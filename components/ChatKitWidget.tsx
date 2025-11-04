"use client";

import { useState } from "react";
import { ChatKitPanel, type FactAction } from "./ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";

export type { FactAction };

interface ChatKitWidgetProps {
  onWidgetAction: (action: FactAction) => Promise<void>;
}

export function ChatKitWidget({ onWidgetAction }: ChatKitWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { scheme, setScheme } = useColorScheme();

  const handleResponseEnd = () => {
    if (process.env.NODE_ENV !== "production") {
      console.debug("[ChatKitWidget] response end");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="relative">
          <div className="absolute bottom-0 right-0 w-96 h-[600px] bg-white dark:bg-slate-900 rounded-lg shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Chat Assistant
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <svg
                  className="w-5 h-5 text-slate-600 dark:text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="h-[540px] overflow-hidden">
              <ChatKitPanel
                theme={scheme}
                onWidgetAction={onWidgetAction}
                onResponseEnd={handleResponseEnd}
                onThemeRequest={setScheme}
              />
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
          aria-label="Open chat"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

