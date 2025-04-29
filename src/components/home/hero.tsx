import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className='relative py-12 md:py-24'>
      <div className='container px-4 md:px-6'>
        <div className='grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2'>
          <div className='flex flex-col justify-center space-y-4'>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl'>
                Discover Modern Essentials for Your Lifestyle
              </h1>
              <p className='max-w-[600px] text-muted-foreground md:text-xl'>
                Shop our curated collection of high-quality products designed
                for the modern consumer.
              </p>
            </div>
            <div className='flex flex-col gap-2 min-[400px]:flex-row'>
              <Link href='/products'>
                <Button size='lg'>Shop Now</Button>
              </Link>
              <Link href='/about'>
                <Button variant='outline' size='lg'>
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <div className='relative h-[350px] w-full overflow-hidden rounded-xl bg-muted md:h-[450px]'>
              <div className='absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-500 opacity-20'></div>
              <div className='absolute inset-0 flex items-center justify-center text-center'>
                <p className='text-xl font-medium text-muted-foreground'>
                  Hero Image
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
