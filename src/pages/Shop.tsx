// src/pages/Shop.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let query = supabase.from('products').select('*');

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error(error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [searchTerm]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(searchTerm ? { search: searchTerm } : {});
  };

  return (
    <div className="max-w-7xl mx-auto p-6 dark:text-gray-300">
      <h1 className="text-3xl font-semibold mb-6">Tất cả sản phẩm</h1>

      <form onSubmit={handleSearchSubmit} className="mb-6">
        <Input
          type="search"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </form>

      {loading ? (
        <div className="text-center py-20 text-muted-foreground">Đang tải sản phẩm...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">Không tìm thấy sản phẩm nào.</div>
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

export default Shop;