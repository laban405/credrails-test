import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.tsx";
import ErrorBoundaryWrapper from "./components/error-boundary.tsx";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./features/auth/contexts/auth-context.tsx";
import { router } from "./routes/routes.tsx";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60000 } },
});

import("./api/axios-mock-Instance.ts").then(({ mock }) => {
  console.log("Mock API initialized", mock);
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundaryWrapper>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <div className="font-ubuntu">
              <Toaster
                position="top-right"
                richColors
                closeButton
                toastOptions={{
                  unstyled: false,
                  classNames: {
                    error: "bg-red-400",
                    success: "text-green-400",
                    warning: "text-yellow-400",
                    info: "bg-blue-400",
                  },
                }}
              />
              <Suspense
                fallback={
                  <div className="flex justify-center items-center mt-24">
                    <div
                      className="text-center w-12 h-12 rounded-full animate-spin
                   border border-solid border-primary border-t-transparent"
                    ></div>
                  </div>
                }
              >
                <RouterProvider router={router} />
              </Suspense>
            </div>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundaryWrapper>
  </StrictMode>
);
