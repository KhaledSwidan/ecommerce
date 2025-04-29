import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

// This would normally come from your database
const categories = [
  {
    id: '1',
    name: 'Electronics',
    image: '/placeholder.svg?height=150&width=150',
    count: 42,
  },
  {
    id: '2',
    name: 'Clothing',
    image: '/placeholder.svg?height=150&width=150',
    count: 36,
  },
  {
    id: '3',
    name: 'Home & Kitchen',
    image: '/placeholder.svg?height=150&width=150',
    count: 28,
  },
  {
    id: '4',
    name: 'Beauty',
    image: '/placeholder.svg?height=150&width=150',
    count: 19,
  },
];

export default function Categories() {
  return (
    <section className='py-12'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2'>
            <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
              Shop by Category
            </h2>
            <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
              Browse our wide selection of products by category
            </p>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8'>
          {categories.map((category) => (
            <Link href={`/products?category=${category.id}`} key={category.id}>
              <Card className='overflow-hidden transition-all hover:shadow-md'>
                <CardContent className='p-4 flex flex-col items-center justify-center text-center'>
                  <div className='relative h-24 w-24 overflow-hidden rounded-full mb-4'>
                    <Image
                      src={category.image || '/placeholder.svg'}
                      alt={category.name}
                      className='h-full w-full object-cover'
                      width={96}
                      height={96}
                    />
                  </div>
                  <h3 className='font-semibold'>{category.name}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {category.count} products
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
