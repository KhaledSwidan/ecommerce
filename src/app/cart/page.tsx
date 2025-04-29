'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useStore } from '@/lib/store';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

import Image from 'next/image';
import { toast } from 'sonner';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useStore();
  const [promoCode, setPromoCode] = useState('');
  const router = useRouter();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const discount = promoCode === 'DISCOUNT20' ? subtotal * 0.2 : 0;
  const total = subtotal + shipping - discount;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
    toast('Item removed', {
      description: 'The item has been removed from your cart.',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo'),
      },
    });
  };

  const handleApplyPromo = () => {
    if (promoCode === 'DISCOUNT20') {
      toast('Promo code applied', {
        description: '20% discount has been applied to your order.',
      });
    } else {
      toast('Invalid promo code', {
        description: 'The promo code you entered is invalid.',
        action: {
          label: 'destructive',
          onClick: () => console.log('Invalid promo code'),
        },
      });
    }
  };

  const handleCheckout = () => {
    // In a real app, you would redirect to a checkout page or process
    toast('Order placed!', {
      description: 'Your order has been successfully placed.',
      action: {
        label: 'View Order',
        onClick: () => router.push('/orders'),
      },
    });
    clearCart();
    router.push('/dashboard');
  };

  if (cart.length === 0) {
    return (
      <div className='container py-10 text-center'>
        <h1 className='text-3xl font-bold mb-6'>Your Cart</h1>
        <p className='text-muted-foreground mb-6'>
          Your cart is currently empty.
        </p>
        <Link href='/products'>
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='container py-10'>
      <h1 className='text-3xl font-bold mb-6'>Your Cart</h1>

      <div className='grid lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2'>
          <Card>
            <CardHeader>
              <CardTitle>Cart Items ({cart.length})</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {cart.map((item) => (
                <div key={item.id} className='flex items-center space-x-4'>
                  <div className='h-20 w-20 bg-muted rounded-md overflow-hidden'>
                    <Image
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      className='h-full w-full object-cover'
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className='flex-1'>
                    <h3 className='font-medium'>{item.name}</h3>
                    <p className='text-sm text-muted-foreground'>
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Button
                      variant='outline'
                      size='icon'
                      className='h-8 w-8'
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      <Minus className='h-4 w-4' />
                    </Button>
                    <span className='w-8 text-center'>{item.quantity}</span>
                    <Button
                      variant='outline'
                      size='icon'
                      className='h-8 w-8'
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      <Plus className='h-4 w-4' />
                    </Button>
                  </div>
                  <div className='text-right'>
                    <p className='font-medium'>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8 text-muted-foreground'
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className='flex justify-between'>
              <Button variant='outline' asChild>
                <Link href='/products'>Continue Shopping</Link>
              </Button>
              <Button variant='ghost' onClick={() => clearCart()}>
                Clear Cart
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex justify-between'>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className='flex justify-between'>
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {discount > 0 && (
                <div className='flex justify-between text-green-600'>
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <Separator />
              <div className='flex justify-between font-bold'>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className='pt-4'>
                <p className='text-sm font-medium mb-2'>Promo Code</p>
                <div className='flex space-x-2'>
                  <Input
                    placeholder='Enter code'
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant='outline' onClick={handleApplyPromo}>
                    Apply
                  </Button>
                </div>
                <p className='text-xs text-muted-foreground mt-2'>
                  Try &quot;DISCOUNT20&quot; for 20% off
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className='w-full' onClick={handleCheckout}>
                Checkout <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
