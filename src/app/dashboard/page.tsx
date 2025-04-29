'use client';

import { useSession } from 'next-auth/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingBag, User, Heart, Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <DashboardSkeleton />;
  }

  return (
    <div className='container py-10'>
      <h1 className='text-3xl font-bold mb-6'>Dashboard</h1>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Orders</CardTitle>
            <ShoppingBag className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>12</div>
            <p className='text-xs text-muted-foreground'>+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Wishlist Items
            </CardTitle>
            <Heart className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>8</div>
            <p className='text-xs text-muted-foreground'>+3 new items</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Pending Orders
            </CardTitle>
            <Clock className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>2</div>
            <p className='text-xs text-muted-foreground'>Processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Account Status
            </CardTitle>
            <User className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>Active</div>
            <p className='text-xs text-muted-foreground'>
              Since {new Date().toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue='orders' className='w-full'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='orders'>Recent Orders</TabsTrigger>
          <TabsTrigger value='wishlist'>Wishlist</TabsTrigger>
          <TabsTrigger value='reservations'>Reservations</TabsTrigger>
        </TabsList>
        <TabsContent value='orders'>
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                View your recent purchase history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {[1, 2, 3, 4].map((order) => (
                    <Card key={order}>
                      <CardContent className='p-4'>
                        <div className='flex justify-between items-center'>
                          <div>
                            <p className='font-medium'>
                              Order #{order}00{order}
                            </p>
                            <p className='text-sm text-muted-foreground'>
                              Placed on {new Date().toLocaleDateString()}
                            </p>
                          </div>
                          <div className='text-right'>
                            <p className='font-medium'>
                              ${(order * 25).toFixed(2)}
                            </p>
                            <p className='text-sm text-muted-foreground'>
                              {order % 2 === 0 ? 'Delivered' : 'Processing'}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='wishlist'>
          <Card>
            <CardHeader>
              <CardTitle>Wishlist</CardTitle>
              <CardDescription>
                Products you&#39;ve saved for later
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Card key={item}>
                    <CardContent className='p-4'>
                      <div className='aspect-square bg-muted rounded-md mb-2'></div>
                      <h3 className='font-medium'>Wishlist Item {item}</h3>
                      <p className='text-sm text-muted-foreground'>
                        ${(item * 15).toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='reservations'>
          <Card>
            <CardHeader>
              <CardTitle>Product Reservations</CardTitle>
              <CardDescription>
                Products you&#39;ve reserved for pickup
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {[1, 2].map((reservation) => (
                    <Card key={reservation}>
                      <CardContent className='p-4'>
                        <div className='flex justify-between items-center'>
                          <div>
                            <p className='font-medium'>
                              Reservation #{reservation}001
                            </p>
                            <p className='text-sm text-muted-foreground'>
                              Reserved for{' '}
                              {new Date(
                                Date.now() + reservation * 86400000
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <div className='text-right'>
                            <p className='font-medium'>
                              Premium Product {reservation}
                            </p>
                            <p className='text-sm text-muted-foreground'>
                              Pickup at Store #{reservation}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className='container py-10'>
      <Skeleton className='h-10 w-[180px] mb-6' />

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8'>
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <Skeleton className='h-5 w-[100px]' />
              <Skeleton className='h-4 w-4 rounded-full' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-8 w-[60px] mb-1' />
              <Skeleton className='h-4 w-[120px]' />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='space-y-4'>
        <Skeleton className='h-10 w-full' />
        <Card>
          <CardHeader>
            <Skeleton className='h-6 w-[150px] mb-2' />
            <Skeleton className='h-4 w-[250px]' />
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className='h-[100px] w-full rounded-md' />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
