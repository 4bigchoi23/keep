"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={() => setTheme(() => theme === 'dark' || ((!theme || theme === 'system') && window?.matchMedia('(prefers-color-scheme: dark)')?.matches) ? 'light' : 'dark')}
    >
      <span className="sr-only">Toggle theme</span>
      <Sun size={20} className="absolute rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon size={20} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
