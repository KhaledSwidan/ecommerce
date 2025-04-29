'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send this to your API
    toast('Subscribed!', {
      description: 'You have successfully subscribed to our newsletter.',
      action: {
        onClick: () => {
          toast.dismiss();
        },
        label: 'Dismiss',
      },
      duration: 5000,
      style: {
        backgroundColor: '#4caf50',
        color: '#fff',
      },
      icon: <span className='text-green-500'>✔️</span>,
      closeButton: true,
    });
    setEmail('');
  };

  return (
    <section className='py-12 bg-muted/50'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2'>
            <h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
              Stay Updated
            </h2>
            <p className='max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
              Subscribe to our newsletter for the latest products, deals, and
              updates.
            </p>
          </div>
          <div className='w-full max-w-md'>
            <form
              onSubmit={handleSubmit}
              className='flex w-full max-w-md flex-col gap-2 sm:flex-row'
            >
              <Input
                placeholder='Enter your email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='flex-1'
              />
              <Button type='submit'>Subscribe</Button>
            </form>
            <p className='mt-2 text-xs text-muted-foreground'>
              By subscribing, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
