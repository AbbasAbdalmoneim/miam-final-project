import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <div className="relative">
      <input
        type={type}
        data-slot="input"
        className={cn(
          // Glassmorphism base styling
          "w-full bg-white/60 backdrop-blur-lg border-2 border-white/30 rounded-xl shadow-xl shadow-slate-900/10",
          // Enhanced sizing and spacing
          "h-12 px-5 py-3 text-base min-w-0",
          // Typography and colors
          "text-slate-900 placeholder:text-slate-400 selection:bg-primary selection:text-primary-foreground",
          // Glass effects and transitions
          "transition-all duration-500 ease-out",
          // Hover states - enhanced glass effect
          "hover:bg-white/80 hover:border-white/50 hover:shadow-2xl hover:shadow-slate-900/15 hover:scale-[1.02]",
          // Focus states - premium focus ring
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "focus-visible:border-primary/60 focus-visible:bg-white/90 focus-visible:shadow-2xl focus-visible:shadow-primary/10",
          "focus-visible:scale-[1.02]",
          // Dark mode enhancements
          "dark:bg-slate-800/60 dark:border-slate-600/30 dark:text-slate-100 dark:placeholder:text-slate-400",
          "dark:shadow-slate-900/30 dark:hover:bg-slate-700/70 dark:hover:border-slate-500/40",
          "dark:focus-visible:bg-slate-700/80 dark:focus-visible:border-primary/70",
          // Error states with glassmorphism
          "aria-invalid:ring-4 aria-invalid:ring-destructive/20 aria-invalid:border-destructive/60 aria-invalid:bg-red-50/60",
          "dark:aria-invalid:ring-destructive/30 dark:aria-invalid:border-destructive/70 dark:aria-invalid:bg-red-900/20",
          // Disabled state with reduced glass effect
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40",
          "disabled:bg-slate-100/40 disabled:backdrop-blur-sm disabled:hover:scale-100",
          // File input styling
          "file:text-slate-700 file:bg-white/80 file:border-0 file:rounded-lg file:px-4 file:py-2",
          "file:text-sm file:font-semibold file:shadow-md file:mr-4",
          "file:hover:bg-white/90 file:transition-colors file:duration-300",
          // Glass overlay effect
          "relative overflow-hidden",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:via-white/5 before:to-transparent",
          "before:opacity-0 before:transition-opacity before:duration-500 before:pointer-events-none",
          "hover:before:opacity-100 focus:before:opacity-60",
          className
        )}
        {...props}
      />
      
      {/* Glass shine effect */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent opacity-0 transition-opacity duration-500 peer-hover:opacity-100 peer-focus:opacity-60 rounded-t-xl pointer-events-none" />
      
      {/* Enhanced focus indicator */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 transition-all duration-500 pointer-events-none peer-focus:opacity-100 peer-focus:animate-pulse" />
    </div>
  )
}

export { Input }
