'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStore } from '@/lib/store';
import { ShoppingCart, Heart, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

// This would normally come from your database
const products = [
  {
    id: '1',
    name: 'Modern Desk Lamp',
    price: 49.99,
    image: '/placeholder.svg?height=400&width=400',
    category: 'Home',
    description:
      'A sleek, adjustable desk lamp with multiple brightness settings. Perfect for your home office or reading nook. Features energy-efficient LED lighting and touch controls.',
    features: [
      'Adjustable brightness levels',
      'Touch-sensitive controls',
      'Energy-efficient LED bulbs',
      'Flexible arm for precise positioning',
      '5-year warranty',
    ],
    specifications: {
      Dimensions: '15 x 6 x 20 inches',
      Weight: '2.5 lbs',
      Material: 'Aluminum and plastic',
      Color: 'Matte Black',
      'Power Source': 'AC adapter (included)',
    },
  },
  {
    id: '2',
    name: 'Wireless Earbuds',
    price: 89.99,
    image: '/placeholder.svg?height=400&width=400',
    category: 'Electronics',
    description:
      'Premium wireless earbuds with noise cancellation and long battery life. Enjoy crystal-clear sound quality and comfortable fit for extended listening sessions.',
    features: [
      'Active noise cancellation',
      '8-hour battery life (24 hours with charging case)',
      'Water and sweat resistant (IPX5)',
      'Touch controls for music and calls',
      'Voice assistant compatible',
    ],
    specifications: {
      Dimensions: '0.8 x 0.7 x 0.6 inches (each earbud)',
      Weight: '5.6g per earbud, 48g charging case',
      Connectivity: 'Bluetooth 5.2',
      Charging: 'USB-C and wireless charging',
      Microphones: 'Dual beamforming microphones',
    },
  },
];

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = products.find((p) => p.id === productId) || products[0];

  const [quantity, setQuantity] = useState(1);
  const addToCart = useStore((state) => state.addToCart);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }

    toast('Added to cart', {
      description: `${quantity} ${
        quantity === 1 ? 'item' : 'items'
      } added to your cart.`,
      action: {
        label: 'View Cart',
        onClick: () => {
          window.location.href = '/cart';
        },
      },
    });
  };

  return (
    <div className='container py-10'>
      <Link
        href='/products'
        className='flex items-center text-sm mb-6 hover:underline'
      >
        <ArrowLeft className='mr-2 h-4 w-4' />
        Back to Products
      </Link>

      <div className='grid md:grid-cols-2 gap-8'>
        <div className='bg-muted rounded-lg overflow-hidden'>
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            width={400}
            height={400}
            className='w-full h-full object-contain'
          />
        </div>

        <div className='space-y-6'>
          <div>
            <h1 className='text-3xl font-bold'>{product.name}</h1>
            <p className='text-muted-foreground'>{product.category}</p>
          </div>

          <div>
            <p className='text-3xl font-bold'>${product.price.toFixed(2)}</p>
            <p className='text-sm text-muted-foreground'>
              Free shipping on orders over $50
            </p>
          </div>

          <p className='text-muted-foreground'>{product.description}</p>

          <div className='flex items-center space-x-4'>
            <div className='flex items-center'>
              <Button
                variant='outline'
                size='icon'
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className='w-12 text-center'>{quantity}</span>
              <Button
                variant='outline'
                size='icon'
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>

            <Button className='flex-1' onClick={handleAddToCart}>
              <ShoppingCart className='mr-2 h-4 w-4' />
              Add to Cart
            </Button>

            <Button variant='outline' size='icon'>
              <Heart className='h-4 w-4' />
              <span className='sr-only'>Add to Wishlist</span>
            </Button>
          </div>

          <Tabs defaultValue='details'>
            <TabsList className='grid w-full grid-cols-3'>
              <TabsTrigger value='details'>Details</TabsTrigger>
              <TabsTrigger value='features'>Features</TabsTrigger>
              <TabsTrigger value='specifications'>Specifications</TabsTrigger>
            </TabsList>
            <TabsContent value='details' className='space-y-4'>
              <p>{product.description}</p>
            </TabsContent>
            <TabsContent value='features' className='space-y-4'>
              <ul className='list-disc pl-5 space-y-2'>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value='specifications' className='space-y-4'>
              <div className='grid grid-cols-2 gap-2'>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className='py-2'>
                    <p className='font-medium'>{key}</p>
                    <p className='text-muted-foreground'>{value}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
