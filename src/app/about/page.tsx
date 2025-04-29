import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className='container py-10'>
      <h1 className='text-4xl font-bold mb-6'>About Us</h1>

      <div className='grid md:grid-cols-2 gap-8 mb-12'>
        <div>
          <h2 className='text-2xl font-semibold mb-4'>Our Story</h2>
          <p className='text-muted-foreground mb-4'>
            Founded in 2023, ShopModern began with a simple mission: to provide
            high-quality, thoughtfully designed products for the modern
            lifestyle. What started as a small online store has grown into a
            curated marketplace offering a wide range of products across
            multiple categories.
          </p>
          <p className='text-muted-foreground mb-4'>
            We believe that good design should be accessible to everyone.
            That&#39;s why we work directly with manufacturers and designers to
            bring you premium products at fair prices.
          </p>
          <p className='text-muted-foreground'>
            Our team is passionate about discovering unique, functional items
            that enhance everyday living. We carefully select each product in
            our catalog, ensuring it meets our standards for quality,
            sustainability, and design excellence.
          </p>
        </div>
        <div className='bg-muted rounded-lg overflow-hidden'>
          <div className='h-full w-full flex items-center justify-center'>
            <p className='text-xl font-medium text-muted-foreground'>
              Company Image
            </p>
          </div>
        </div>
      </div>

      <h2 className='text-2xl font-semibold mb-6'>Our Values</h2>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
        <Card>
          <CardContent className='p-6'>
            <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
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
                className='h-6 w-6 text-primary'
              >
                <path d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z' />
                <path d='m9 12 2 2 4-4' />
              </svg>
            </div>
            <h3 className='text-xl font-semibold mb-2'>Quality</h3>
            <p className='text-muted-foreground'>
              We never compromise on quality. Every product in our catalog
              undergoes rigorous testing to ensure it meets our high standards.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-6'>
            <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
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
                className='h-6 w-6 text-primary'
              >
                <path d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z' />
                <path d='M7.5 12h9' />
                <path d='M7.5 9h9' />
                <path d='M7.5 15h9' />
              </svg>
            </div>
            <h3 className='text-xl font-semibold mb-2'>Simplicity</h3>
            <p className='text-muted-foreground'>
              We believe in the power of simplicity. Our products are designed
              to be intuitive, functional, and free from unnecessary
              complications.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-6'>
            <div className='h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
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
                className='h-6 w-6 text-primary'
              >
                <path d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z' />
                <path d='M8 14s1.5 2 4 2 4-2 4-2' />
                <line x1='9' x2='9.01' y1='9' y2='9' />
                <line x1='15' x2='15.01' y1='9' y2='9' />
              </svg>
            </div>
            <h3 className='text-xl font-semibold mb-2'>Customer Happiness</h3>
            <p className='text-muted-foreground'>
              Your satisfaction is our priority. We&#39;re committed to
              providing exceptional customer service and a seamless shopping
              experience.
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className='text-2xl font-semibold mb-6'>Our Team</h2>
      <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
        {[1, 2, 3, 4].map((member) => (
          <Card key={member}>
            <CardContent className='p-6 text-center'>
              <div className='w-24 h-24 rounded-full bg-muted mx-auto mb-4'></div>
              <h3 className='font-semibold'>Team Member {member}</h3>
              <p className='text-sm text-muted-foreground'>Position</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='text-center'>
        <h2 className='text-2xl font-semibold mb-4'>Join Our Journey</h2>
        <p className='text-muted-foreground max-w-2xl mx-auto mb-6'>
          We&#39;re always looking for passionate individuals to join our team.
          If you share our values and vision, we&#39;d love to hear from you.
        </p>
        <div className='flex justify-center gap-4'>
          <Link href='/contact'>
            <Button>Contact Us</Button>
          </Link>
          <Link href='/products'>
            <Button variant='outline'>Shop Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
