// app/providers.tsx
"use client";

import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from 'next-auth/react';
import { UsersProvider } from '@/app/context/UserContext';
import { ProductsProvider } from '@/app/context/ProductsContext'
import { CategoriesProvider } from '@/app/context/CategoriesContext'
import { FiltersProvider } from '@/app/context/FiltersContext'
import { ToasterProviderSonner } from '@/components/ToastProviderSonner'
import { AdminsProvider } from './context/AdminsContext';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AdminsProvider>
      <FiltersProvider>
        <CategoriesProvider>
          <ProductsProvider>
            <UsersProvider>
              <SessionProvider>
                <NextUIProvider>
                  <NextThemesProvider attribute="class" defaultTheme="dark">
                    {/* <ToasterProvider/> */}
                    <Toaster />
                    {children}
                  </NextThemesProvider>
                </NextUIProvider>
              </SessionProvider>
            </UsersProvider>
          </ProductsProvider>
        </CategoriesProvider>
      </FiltersProvider>
    </AdminsProvider>
  )
}