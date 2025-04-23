"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"

export default function ThemeSelect() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <span className="sr-only">The current theme is: {theme}</span>
          {(() => {
            switch (theme) {
              case 'light':
                return <Sun size={20} />
              case 'dark': 
                return <Moon size={20} />
              default:
                return <Monitor size={20} />
            }
          })()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem
          className="cursor-pointer hover:bg-muted"
          onClick={() => setTheme("light")}
        >
          Light
          <DropdownMenuShortcut><Sun /></DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:bg-muted"
          onClick={() => setTheme("dark")}
        >
          Dark
          <DropdownMenuShortcut><Moon /></DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:bg-muted"
          onClick={() => setTheme("system")}
        >
          System
          <DropdownMenuShortcut><Monitor /></DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
