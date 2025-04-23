"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex justify-center items-center border rounded-full p-1">
      <Button
        variant={theme === 'light' ? 'secondary' : 'ghost'}
        size="icon"
        className="flex gap-1 rounded-full"
        onClick={() => setTheme("light")}
      >
        <Sun />
        <span className="sr-only">Light</span>
      </Button>
      <Button
        variant={theme === 'system' ? 'secondary' : 'ghost'}
        size="icon"
        className="flex gap-1 rounded-full"
        onClick={() => setTheme("system")}
      >
        <Monitor />
        <span className="sr-only">System</span>
      </Button>
      <Button
        variant={theme === 'dark' ? 'secondary' : 'ghost'}
        size="icon"
        className="flex gap-1 rounded-full"
        onClick={() => setTheme("dark")}
      >
        <Moon />
        <span className="sr-only">Dark</span>
      </Button>
    </div>
  )
}
