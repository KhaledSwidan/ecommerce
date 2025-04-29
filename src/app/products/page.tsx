import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import ProductCard from '@/components/products/product-card';

// This would normally come from your database
const products = [
  {
    id: '1',
    name: 'Modern Desk Lamp',
    price: 49.99,
    image: '/placeholder.svg?height=200&width=200',
    category: 'Home',
    description:
      'A sleek, adjustable desk lamp with multiple brightness settings.',
  },
  {
    id: '2',
    name: 'Wireless Earbuds',
    price: 89.99,
    image: '/placeholder.svg?height=200&width=200',
    category: 'Electronics',
    description:
      'Premium wireless earbuds with noise cancellation and long battery life.',
  },
  {
    id: '3',
    name: 'Minimalist Watch',
    price: 129.99,
    image: '/placeholder.svg?height=200&width=200',
    category: 'Accessories',
    description:
      'Elegant minimalist watch with a leather strap and Japanese movement.',
  },
  {
    id: '4',
    name: 'Ergonomic Chair',
    price: 199.99,
    image: '/placeholder.svg?height=200&width=200',
    category: 'Furniture',
    description:
      'Comfortable ergonomic office chair with lumbar support and adjustable height.',
  },
  {
    id: '5',
    name: 'Smart Water Bottle',
    price: 39.99,
    image: '/placeholder.svg?height=200&width=200',
    category: 'Health',
    description:
      'Smart water bottle that tracks your hydration and reminds you to drink water.',
  },
  {
    id: '6',
    name: 'Portable Bluetooth Speaker',
    price: 79.99,
    image: '/placeholder.svg?height=200&width=200',
    category: 'Electronics',
    description:
      'Waterproof portable speaker with 360° sound and 20-hour battery life.',
  },
  {
    id: '7',
    name: 'Ceramic Plant Pot',
    price: 29.99,
    image: '/placeholder.svg?height=200&width=200',
    category: 'Home',
    description:
      'Handcrafted ceramic pot perfect for indoor plants and home decor.',
  },
  {
    id: '8',
    name: 'Fitness Tracker',
    price: 59.99,
    image: '/placeholder.svg?height=200&width=200',
    category: 'Health',
    description:
      'Advanced fitness tracker with heart rate monitoring and sleep analysis.',
  },
];

const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'home', name: 'Home & Kitchen' },
  { id: 'furniture', name: 'Furniture' },
  { id: 'health', name: 'Health & Fitness' },
  { id: 'accessories', name: 'Accessories' },
];

export default function ProductsPage() {
  return (
    <div className='container py-10'>
      <h1 className='text-3xl font-bold mb-6'>Products</h1>

      <div className='flex flex-col md:flex-row gap-6'>
        {/* Filters Sidebar */}
        <div className='w-full md:w-64 space-y-6'>
          <Card>
            <CardContent className='p-4 space-y-4'>
              <div>
                <h3 className='font-medium mb-2'>Search</h3>
                <div className='flex gap-2'>
                  <Input placeholder='Search products...' />
                  <Button variant='secondary' size='icon'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='h-4 w-4'
                    >
                      <circle cx='11' cy='11' r='8' />
                      <path d='m21 21-4.3-4.3' />
                    </svg>
                  </Button>
                </div>
              </div>

              <div>
                <h3 className='font-medium mb-2'>Categories</h3>
                <div className='space-y-2'>
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className='flex items-center space-x-2'
                    >
                      <Checkbox id={`category-${category.id}`} />
                      <Label htmlFor={`category-${category.id}`}>
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className='font-medium mb-2'>Price Range</h3>
                <Slider defaultValue={[0, 200]} max={500} step={10} />
                <div className='flex items-center justify-between mt-2'>
                  <span className='text-sm'>$0</span>
                  <span className='text-sm'>$500</span>
                </div>
              </div>

              <Button className='w-full'>Apply Filters</Button>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className='flex-1'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
