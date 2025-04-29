'use client';

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { SonnerDemoProps } from '@/types/uiTypes';

export function SonnerDemo({
  mainTitle,
  toastTitle,
  toastDescription,
  toastActionOnClick,
  toastActionLabel,
}: SonnerDemoProps) {
  return (
    <Button
      variant='outline'
      onClick={() =>
        toast(toastTitle, {
          description: toastDescription,
          action: {
            label: toastActionLabel,
            onClick: toastActionOnClick,
          },
        })
      }
    >
      {mainTitle}
    </Button>
  );
}
