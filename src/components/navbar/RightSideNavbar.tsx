'use client';

import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import Link from 'next/link';
import { routes } from './navbarRoutes';
import { usePathname } from 'next/navigation';

const RightSideNavbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isAuthenticated } = useStore();
  const pathname = usePathname();

  return (
    <div className='flex items-center gap-4'>
      {isSearchOpen ? (
        <div className='hidden md:flex items-center relative'>
          <Input
            type='search'
            placeholder='Search products...'
            className='w-[200px] lg:w-[300px]'
          />
          <Button
            variant='ghost'
            size='icon'
            className='absolute right-0 cursor-pointer'
            onClick={() => setIsSearchOpen(false)}
          >
            <X className='h-4 w-4' />
          </Button>
        </div>
      ) : (
        <Button
          variant='ghost'
          size='icon'
          className='hidden md:flex cursor-pointer'
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className='h-5 w-5' />
          <span className='sr-only'>Search</span>
        </Button>
      )}
      <Link href='/cart'>
        <Button variant='ghost' size='icon' className='cursor-pointer'>
          <ShoppingCart className='h-5 w-5' />
          <span className='sr-only'>Cart</span>
        </Button>
      </Link>
      <Link href={isAuthenticated ? '/profile' : '/login'}>
        <Button variant='ghost' size='icon' className='cursor-pointer'>
          <User className='h-5 w-5' />
          <span className='sr-only'>Account</span>
        </Button>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden cursor-pointer'
          >
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='right'>
          <nav className='flex flex-col gap-4 mt-8'>
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'text-base font-medium transition-colors hover:text-primary',
                  pathname === route.href
                    ? 'text-foreground'
                    : 'text-foreground/60'
                )}
              >
                {route.label}
              </Link>
            ))}
            <div className='mt-4'>
              <Input
                type='search'
                placeholder='Search products...'
                className='w-full'
              />
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default RightSideNavbar;
