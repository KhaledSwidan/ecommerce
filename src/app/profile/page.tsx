'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    // Populate form with user data
    if (session?.user) {
      setProfileData({
        name: session?.user?.name || '',
        email: session.user.email || '',
        phone: '555-123-4567', // Example data
        address: '123 Main St', // Example data
        city: 'San Francisco', // Example data
        state: 'CA', // Example data
        zip: '94103', // Example data
      });
    }
  }, [status, router, session]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Update session data
      await update({
        ...session,
        user: {
          ...session?.user,
          name: profileData.name,
        },
      });

      // Here you would normally call your API to update the user profile
      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(profileData),
      // })

      toast('Profile updated', {
        description: 'Your profile information has been updated successfully.',
        action: {
          label: 'Undo',
          onClick: () => {
            // Handle undo action
            setProfileData({
              name: session?.user?.name || '',
              email: session?.user?.email || '',
              phone: '555-123-4567',
              address: '123 Main St',
              city: 'San Francisco',
              state: 'CA',
              zip: '94103',
            });
          },
        },
      });
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast('Error', {
        description: 'Failed to update profile. Please try again.',
        style: { backgroundColor: 'red', color: 'white' },
        // Example styling for destructive toast
        action: {
          label: 'Retry',
          onClick: () => {
            // Handle retry action
            handleProfileSubmit(e);
          },
        },
      });
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast('Error', {
        description: 'New passwords do not match.',
        style: { backgroundColor: 'red', color: 'white' },
        action: {
          label: 'Retry',
          onClick: () => {
            // Handle retry action
            setPasswordData((prev) => ({
              ...prev,
              newPassword: '',
              confirmPassword: '',
            }));
          },
        },
      });
      return;
    }

    // Here you would normally call your API
    // const response = await fetch('/api/user/password', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     currentPassword: passwordData.currentPassword,
    //     newPassword: passwordData.newPassword,
    //   }),
    // })

    toast('Password updated', {
      description: 'Your password has been updated successfully.',
      action: {
        label: 'Undo',
        onClick: () => {
          // Handle undo action
          setPasswordData({
            currentPassword: passwordData.currentPassword,
            newPassword: '',
            confirmPassword: '',
          });
        },
      },
    });

    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  if (status === 'loading') {
    return <ProfileSkeleton />;
  }

  return (
    <div className='container py-10'>
      <h1 className='text-3xl font-bold mb-6'>My Profile</h1>

      <Tabs defaultValue='profile' className='w-full'>
        <TabsList className='grid w-full grid-cols-3 mb-8'>
          <TabsTrigger value='profile'>Profile Information</TabsTrigger>
          <TabsTrigger value='password'>Change Password</TabsTrigger>
          <TabsTrigger value='orders'>Order History</TabsTrigger>
        </TabsList>

        <TabsContent value='profile'>
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and address
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileSubmit}>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='name'>Full Name</Label>
                  <Input
                    id='name'
                    name='name'
                    value={profileData.name}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    value={profileData.email}
                    onChange={handleProfileChange}
                    disabled
                  />
                  <p className='text-xs text-muted-foreground'>
                    Email cannot be changed
                  </p>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='phone'>Phone</Label>
                  <Input
                    id='phone'
                    name='phone'
                    value={profileData.phone}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='address'>Address</Label>
                  <Input
                    id='address'
                    name='address'
                    value={profileData.address}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='city'>City</Label>
                    <Input
                      id='city'
                      name='city'
                      value={profileData.city}
                      onChange={handleProfileChange}
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='state'>State</Label>
                    <Input
                      id='state'
                      name='state'
                      value={profileData.state}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='zip'>ZIP Code</Label>
                  <Input
                    id='zip'
                    name='zip'
                    value={profileData.zip}
                    onChange={handleProfileChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type='submit' className='ml-auto'>
                  Save Changes
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value='password'>
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <form onSubmit={handlePasswordSubmit}>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='currentPassword'>Current Password</Label>
                  <Input
                    id='currentPassword'
                    name='currentPassword'
                    type='password'
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='newPassword'>New Password</Label>
                  <Input
                    id='newPassword'
                    name='newPassword'
                    type='password'
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='confirmPassword'>Confirm New Password</Label>
                  <Input
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type='submit' className='ml-auto'>
                  Update Password
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value='orders'>
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                View your past orders and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {[1, 2, 3].map((order) => (
                  <Card key={order}>
                    <CardContent className='p-4'>
                      <div className='flex justify-between items-center'>
                        <div>
                          <p className='font-medium'>
                            Order #{order}00{order}
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            Placed on{' '}
                            {new Date(
                              Date.now() - order * 86400000 * 10
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div className='text-right'>
                          <p className='font-medium'>
                            ${(order * 50).toFixed(2)}
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            {order === 1
                              ? 'Delivered'
                              : order === 2
                              ? 'Shipped'
                              : 'Processing'}
                          </p>
                        </div>
                      </div>
                      <div className='mt-4'>
                        <Button variant='outline' size='sm'>
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className='container py-10'>
      <Skeleton className='h-10 w-[150px] mb-6' />

      <Skeleton className='h-10 w-full mb-8' />

      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-[200px] mb-2' />
          <Skeleton className='h-4 w-[300px]' />
        </CardHeader>
        <CardContent className='space-y-4'>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className='space-y-2'>
              <Skeleton className='h-4 w-[100px]' />
              <Skeleton className='h-10 w-full' />
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Skeleton className='h-10 w-[120px] ml-auto' />
        </CardFooter>
      </Card>
    </div>
  );
}
