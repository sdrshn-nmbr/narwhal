"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

interface CustomThemeProviderProps extends Omit<React.ComponentProps<typeof NextThemesProvider>, 'children'> {
  children: React.ReactNode;
}

export function ThemeProvider({ children, ...props }: CustomThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}