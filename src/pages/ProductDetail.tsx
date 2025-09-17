// src/pages/ProductDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  size?: string;
  color?: string;
}

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!productId) return;
    const fetchProduct = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*').eq('id', productId).single();

      if (error) {
        toast({
          title: 'Lỗi tải sản phẩm',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [productId, toast]);

  const handleAddToCart = () => {
    setAddingToCart(true);
    // Lưu giỏ hàng vào localStorage hoặc Context (ví dụ)
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((item: any) => item.productId === product?.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ productId: product?.id, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    toast({
      title: 'Đã thêm vào giỏ hàng',
      description: product?.name,
    });
    setAddingToCart(false);
  };

  if (loading || !product) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-muted-foreground">
        Đang tải chi tiết sản phẩm...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 dark:text-gray-300">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 rounded-lg object-cover max-h-[500px]"
        />
        <div className="flex flex-col flex-1">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl font-semibold text-primary mb-4">{product.price.toLocaleString()}₫</p>
          <p className="mb-6 whitespace-pre-line">{product.description}</p>

          {product.size && (
            <p className="mb-2">
              <strong>Kích thước:</strong> {product.size}
            </p>
          )}
          {product.color && (
            <p className="mb-6">
              <strong>Màu sắc:</strong> {product.color}
            </p>
          )}

          <Button onClick={handleAddToCart} disabled={addingToCart}>
            {addingToCart ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;