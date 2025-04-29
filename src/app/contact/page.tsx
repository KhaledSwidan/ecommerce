'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast('Message sent!', {
        description: "We'll get back to you as soon as possible.",
        action: {
          label: 'Close',
          onClick: () => console.log('Closed'),
        },
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className='container py-10'>
      <h1 className='text-4xl font-bold mb-6'>Contact Us</h1>

      <div className='grid md:grid-cols-2 gap-8'>
        <div>
          <p className='text-muted-foreground mb-6'>
            We&#39;d love to hear from you! Whether you have a question about
            our products, need help with an order, or want to provide feedback,
            our team is here to assist you.
          </p>

          <div className='space-y-6'>
            <Card>
              <CardContent className='p-6 flex items-center'>
                <div className='h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4'>
                  <Mail className='h-5 w-5 text-primary' />
                </div>
                <div>
                  <h3 className='font-semibold'>Email Us</h3>
                  <p className='text-sm text-muted-foreground'>
                    support@shopmodern.com
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-6 flex items-center'>
                <div className='h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4'>
                  <Phone className='h-5 w-5 text-primary' />
                </div>
                <div>
                  <h3 className='font-semibold'>Call Us</h3>
                  <p className='text-sm text-muted-foreground'>
                    +1 (555) 123-4567
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='p-6 flex items-center'>
                <div className='h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4'>
                  <MapPin className='h-5 w-5 text-primary' />
                </div>
                <div>
                  <h3 className='font-semibold'>Visit Us</h3>
                  <p className='text-sm text-muted-foreground'>
                    123 Modern Street
                    <br />
                    San Francisco, CA 94103
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we&#39;ll get back to you as soon as
              possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <label htmlFor='name' className='text-sm font-medium'>
                  Name
                </label>
                <Input
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='space-y-2'>
                <label htmlFor='email' className='text-sm font-medium'>
                  Email
                </label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='space-y-2'>
                <label htmlFor='subject' className='text-sm font-medium'>
                  Subject
                </label>
                <Input
                  id='subject'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='space-y-2'>
                <label htmlFor='message' className='text-sm font-medium'>
                  Message
                </label>
                <Textarea
                  id='message'
                  name='message'
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type='submit' className='w-full' disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
