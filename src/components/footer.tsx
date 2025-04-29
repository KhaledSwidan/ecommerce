import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='border-t bg-background'>
      <div className='container px-4 py-8 md:py-12'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
          <div>
            <h3 className='text-lg font-semibold'>ShopModern</h3>
            <p className='mt-2 text-sm text-muted-foreground'>
              Your one-stop shop for modern products with style and quality.
            </p>
          </div>
          <div>
            <h3 className='text-lg font-semibold'>Shop</h3>
            <ul className='mt-2 space-y-2 text-sm'>
              <li>
                <Link
                  href='/products'
                  className='text-muted-foreground hover:text-foreground'
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href='/products/featured'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Featured
                </Link>
              </li>
              <li>
                <Link
                  href='/products/new'
                  className='text-muted-foreground hover:text-foreground'
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold'>Company</h3>
            <ul className='mt-2 space-y-2 text-sm'>
              <li>
                <Link
                  href='/about'
                  className='text-muted-foreground hover:text-foreground'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href='/terms'
                  className='text-muted-foreground hover:text-foreground'
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold'>Connect</h3>
            <div className='mt-2 flex space-x-4'>
              <Link
                href='#'
                className='text-muted-foreground hover:text-foreground'
              >
                <Facebook className='h-5 w-5' />
                <span className='sr-only'>Facebook</span>
              </Link>
              <Link
                href='#'
                className='text-muted-foreground hover:text-foreground'
              >
                <Instagram className='h-5 w-5' />
                <span className='sr-only'>Instagram</span>
              </Link>
              <Link
                href='#'
                className='text-muted-foreground hover:text-foreground'
              >
                <Twitter className='h-5 w-5' />
                <span className='sr-only'>Twitter</span>
              </Link>
            </div>
            <p className='mt-4 text-sm text-muted-foreground'>
              Subscribe to our newsletter for updates
            </p>
          </div>
        </div>
        <div className='mt-8 border-t pt-6 text-center text-sm text-muted-foreground'>
          <p>
            &copy; {new Date().getFullYear()} ShopModern. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
