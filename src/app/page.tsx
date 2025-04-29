import Hero from '@/components/home/hero';
import FeaturedProducts from '@/components/home/featured-products';
import Categories from '@/components/home/categories';
import Newsletter from '@/components/home/newsletter';

export default function Home() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Newsletter />
    </div>
  );
}
