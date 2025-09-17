// src/pages/CategoryPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryId) return;
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', categoryId);

      if (error) {
        console.error(error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div className="max-w-7xl mx-auto p-6 dark:text-gray-300">
      <h1 className="text-3xl font-semibold mb-6 capitalize">{categoryId}</h1>

      {loading ? (
        <div className="text-center py-20 text-muted-foreground">Đang tải sản phẩm...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">Không có sản phẩm trong danh mục này.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;