// src/providers/QueryProvider.js
"use client";

import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

// Optionally configure default query options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // or any other default options
    },
  },
});

export default function QueryProvider({ children }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex justify-center items-center">
          <Loader2 className="animate-spin" size={40} />
        </div>
      }
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Suspense>
  );
}
