import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export default function DynamicProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const fetchProducts = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', false) // Lấy sản phẩm không phải nổi bật
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;
      if (data) {
        setProducts(prev => [...prev, ...data]);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">More Products</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer">
            <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <p className="font-bold text-teal-600">€{product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => setPage(prev => prev + 1)}
          disabled={loading}
          className="bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </section>
  );
}