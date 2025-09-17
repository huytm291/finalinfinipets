// src/App.tsx
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile'; 
import Shop from './pages/Shop';       
import CategoryPage from './pages/CategoryPage'; 
import ProductDetail from './pages/ProductDetail'; 
import Cart from './pages/Cart';       
import Favorites from './pages/Favorites'; 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:categoryId" element={<CategoryPage />} /> {/* Route cho danh mục */}
          <Route path="/product/:productId" element={<ProductDetail />} /> {/* Route cho chi tiết sản phẩm */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;