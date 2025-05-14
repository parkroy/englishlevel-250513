
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useToast } from "./hooks/use-toast";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Error boundary component
const ErrorFallback = () => {
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-bgLight">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center">
        <div className="text-red-500 text-5xl mb-4">😢</div>
        <h2 className="text-2xl font-bold mb-4">페이지 로딩 중 문제가 발생했습니다</h2>
        <p className="text-gray-600 mb-6">잠시 후 다시 시도해주세요</p>
        <button 
          onClick={() => {
            toast({
              title: "새로고침 중...",
              description: "페이지를 새로고침 합니다.",
            });
            window.location.reload();
          }}
          className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-6 
                   rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          다시 시도하기
        </button>
      </div>
    </div>
  );
};

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-bgLight">
    <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center">
      <div className="animate-pulse-gentle">
        <div className="h-32 w-32 bg-blue-100 rounded-full mx-auto mb-4"></div>
        <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-3"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>
      <p className="mt-6 text-gray-600">잠시만 기다려주세요...</p>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30000,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
