import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { Link } from 'react-router-dom';

interface CartItem {
  productId: string;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    if (cartItems.length === 0) {
      setProducts([]);
      return;
    }
    const fetchProducts = async () => {
      setLoading(true);
      const ids = cartItems.map((item) => item.productId);
      const { data, error } = await supabase.from('products').select('*').in('id', ids);

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
  }, [cartItems, toast]);

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    const updated = cartItems.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeItem = (productId: string) => {
    const updated = cartItems.filter((item) => item.productId !== productId);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const totalPrice = products.reduce((acc, product) => {
    const item = cartItems.find((i) => i.productId === product.id);
    return acc + (item ? product.price * item.quantity : 0);
  }, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-muted-foreground">
        Đang tải giỏ hàng...
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 dark:text-gray-300">
        Giỏ hàng của bạn đang trống.
        <div className="mt-4">
          <Link to="/shop" className="text-primary underline">
            Mua sắm ngay
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 dark:text-gray-300">
      <h1 className="text-3xl font-semibold mb-6">Giỏ hàng của bạn</h1>
      <div className="space-y-6">
        {products.map((product) => {
          const item = cartItems.find((i) => i.productId === product.id);
          if (!item) return null;
          return (
            <div key={product.id} className="flex items-center gap-4 border-b border-gray-300 dark:border-gray-700 pb-4">
              <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-primary font-semibold">{product.price.toLocaleString()}₫</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1 border rounded disabled:opacity-50"
                  onClick={() => updateQuantity(product.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="px-3 py-1 border rounded"
                  onClick={() => updateQuantity(product.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <Button variant="destructive" onClick={() => removeItem(product.id)}>
                Xóa
              </Button>
            </div>
          );
        })}
      </div>
      <div className="mt-8 flex justify-between items-center">
        <p className="text-xl font-semibold">Tổng tiền: {totalPrice.toLocaleString()}₫</p>
        <Button onClick={() => toast({ title: 'Chức năng thanh toán chưa được triển khai.' })}>
          Thanh toán
        </Button>
      </div>
    </div>
  );
};

export default Cart;