// src/providers/QueryProvider.js
"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
