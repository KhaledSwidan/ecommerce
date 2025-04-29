import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// This would normally come from your database
const featuredProducts = [
  {
    id: '1',
    name: 'Modern Desk Lamp',
    price: 49.99,
    image: '/placeholder.svg?height=200&width=200',
    category: 'Home',
  },
  {
    id: '2',
    name: 'Wireless Earbuds',
    price: 89.99,
    image: '/placeholder.svg?height=200&width=200',
    category: 'Electronics',
  },
  {
    id: '3',
    name: 'Minimalist Watch',
    price: 129.99,
    image: '/placeholder.svg?height=200&width=200',
    category: 'Accessories',
  },
  {
    id: '4',
    name: 'Ergonomic Chair',
    price: 199.99,
    image: '/placeholder.svg?height=200&width=200',
    category: 'Furniture',
  },
];

export default function FeaturedProducts() {
  return (
    <section className='py-12'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2'>
            <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
              Featured Products
            </h2>
            <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
              Discover our most popular items loved by customers
            </p>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8'>
          {featuredProducts.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className='group'
            >
              <Card className='overflow-hidden transition-all hover:shadow-md'>
                <div className='aspect-square overflow-hidden'>
                  <Image
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    width={200}
                    height={200}
                    className='h-full w-full object-cover transition-transform group-hover:scale-105'
                  />
                </div>
                <CardContent className='p-4'>
                  <h3 className='font-semibold'>{product.name}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {product.category}
                  </p>
                  <p className='mt-2 font-medium'>
                    ${product.price.toFixed(2)}
                  </p>
                </CardContent>
                <CardFooter className='p-4 pt-0'>
                  <Button variant='secondary' className='w-full'>
                    View Product
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        <div className='flex justify-center mt-8'>
          <Link href='/products'>
            <Button variant='outline'>View All Products</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
