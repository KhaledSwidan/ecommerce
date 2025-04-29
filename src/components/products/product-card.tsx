'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    toast('Added to cart', {
      description: `${product.name} has been added to your cart.`,
      action: {
        label: 'View Cart',
        onClick: () => (window.location.href = '/cart'),
      },
      duration: 3000,
      style: {
        backgroundColor: '#4caf50',
        color: '#fff',
      },
      icon: <ShoppingCart className='h-4 w-4' />,
      closeButton: true,
    });
  };

  return (
    <Card className='overflow-hidden'>
      <Link href={`/products/${product.id}`}>
        <div className='aspect-square overflow-hidden'>
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            className='h-full w-full object-cover transition-transform hover:scale-105'
            width={500}
            height={500}
          />
        </div>
        <CardContent className='p-4'>
          <h3 className='font-semibold'>{product.name}</h3>
          <p className='text-sm text-muted-foreground'>{product.category}</p>
          <p className='mt-2 font-medium'>${product.price.toFixed(2)}</p>
        </CardContent>
      </Link>
      <CardFooter className='p-4 pt-0'>
        <div className='flex w-full gap-2'>
          <Button
            variant='outline'
            size='sm'
            className='w-full'
            onClick={handleAddToCart}
          >
            <ShoppingCart className='mr-2 h-4 w-4' />
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
