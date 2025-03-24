'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import Menu from '@/components/ui/menu'

export const Header = () => {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  )
}

const Navbar = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'w-full h-16 items-center justify-between border border-border dark:bg-zinc-800 bg-zinc-100 rounded-lg p-4 m-4 flex',
        className
      )}
    >
      Hyphenate Words
      <Menu />
    </div>
  )
}
