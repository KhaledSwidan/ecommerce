'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { ShoppingCart, User, Menu, X, Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useStore } from '@/lib/store';

const routes = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { data: session } = useSession();
  const { cart } = useStore();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center justify-between'>
        <div className='flex items-center gap-6 md:gap-10'>
          <Link href='/' className='flex items-center space-x-2'>
            <span className='text-xl font-bold'>ShopModern</span>
          </Link>
          <nav className='hidden gap-6 md:flex'>
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === route.href
                    ? 'text-foreground'
                    : 'text-foreground/60'
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
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
                className='absolute right-0'
                onClick={() => setIsSearchOpen(false)}
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          ) : (
            <Button
              variant='ghost'
              size='icon'
              className='hidden md:flex'
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className='h-5 w-5' />
              <span className='sr-only'>Search</span>
            </Button>
          )}
          <Link href='/cart'>
            <Button variant='ghost' size='icon' className='relative'>
              <ShoppingCart className='h-5 w-5' />
              {cartItemsCount > 0 && (
                <span className='absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center'>
                  {cartItemsCount}
                </span>
              )}
              <span className='sr-only'>Cart</span>
            </Button>
          </Link>

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='relative'>
                  <User className='h-5 w-5' />
                  <span className='sr-only'>User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>
                  <div className='flex flex-col'>
                    <span>{session.user?.name}</span>
                    <span className='text-xs text-muted-foreground'>
                      {session.user?.email}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href='/dashboard'>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/profile'>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
                  <LogOut className='mr-2 h-4 w-4' />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href='/login'>
              <Button variant='ghost' size='icon'>
                <User className='h-5 w-5' />
                <span className='sr-only'>Login</span>
              </Button>
            </Link>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon' className='md:hidden'>
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
                {session ? (
                  <div className='mt-4 pt-4 border-t'>
                    <div className='mb-2 font-medium'>{session.user?.name}</div>
                    <div className='flex flex-col gap-2'>
                      <Link
                        href='/dashboard'
                        className='text-muted-foreground hover:text-foreground'
                      >
                        Dashboard
                      </Link>
                      <Link
                        href='/profile'
                        className='text-muted-foreground hover:text-foreground'
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className='flex items-center text-muted-foreground hover:text-foreground'
                      >
                        <LogOut className='mr-2 h-4 w-4' />
                        <span>Log out</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='mt-4 pt-4 border-t'>
                    <Link href='/login'>
                      <Button className='w-full'>Login</Button>
                    </Link>
                    <div className='mt-2'>
                      <Link href='/register'>
                        <Button variant='outline' className='w-full'>
                          Register
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
