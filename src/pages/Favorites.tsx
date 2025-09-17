import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ProductCard from '@/components/ProductCard';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('favorites');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (favorites.length === 0) {
      setProducts([]);
      return;
    }
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*').in('id', favorites);

      if (error) {
        toast({
          title: 'Lỗi tải sản phẩm',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [favorites, toast]);

  const handleRemoveFavorite = (productId: string) => {
    const updated = favorites.filter((id) => id !== productId);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
    toast({
      title: 'Đã xóa khỏi yêu thích',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-muted-foreground dark:text-gray-300">
        Đang tải sản phẩm yêu thích...
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-20 dark:text-gray-300">
        Bạn chưa có sản phẩm yêu thích nào.
        <div className="mt-4">
          <Link to="/shop" className="text-primary underline">
            Khám phá sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 dark:text-gray-300">
      <h1 className="text-3xl font-semibold mb-6">Sản phẩm yêu thích</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="relative group">
            <ProductCard product={product} />
            <button
              onClick={() => handleRemoveFavorite(product.id)}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Xóa khỏi yêu thích"
              title="Xóa khỏi yêu thích"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;