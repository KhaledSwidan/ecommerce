'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  // استخدام useEffect للتأكد من أن الكود يشتغل على الـ Client فقط
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // ده بيخلي الكومبوننت يختفي لحد ما يبقى الـ Client جاهز
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

// الكود بيعمل مكون React اسمه ThemeProvider هدفه إنه يخلّي مشروع Next.js بتاعك يقدر يدعم تغيير الثيم (زي Light Mode / Dark Mode) باستخدام مكتبة اسمها next-themes.
