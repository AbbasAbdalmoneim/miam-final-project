"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
 
        "peer bg-white/60 backdrop-blur-lg border-2 border-white/30 shadow-lg shadow-slate-900/10",
   
        "size-5 shrink-0 rounded-lg",

        "transition-all duration-500 ease-out",

        "hover:bg-white/80 hover:border-white/50 hover:shadow-xl hover:shadow-slate-900/15 hover:scale-105",

        "data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-primary/80 data-[state=checked]:via-primary/90 data-[state=checked]:to-primary",
        "data-[state=checked]:border-primary/60 data-[state=checked]:shadow-2xl data-[state=checked]:shadow-primary/25",
        "data-[state=checked]:backdrop-blur-md",

        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "focus-visible:border-primary/70 focus-visible:shadow-xl focus-visible:scale-105",

        "dark:bg-slate-800/60 dark:border-slate-600/30 dark:shadow-slate-900/30",
        "dark:hover:bg-slate-700/70 dark:hover:border-slate-500/40",
        "dark:data-[state=checked]:bg-gradient-to-br dark:data-[state=checked]:from-primary/70 dark:data-[state=checked]:to-primary/90",

        "aria-invalid:ring-4 aria-invalid:ring-destructive/20 aria-invalid:border-destructive/60",
        "dark:aria-invalid:ring-destructive/30 dark:aria-invalid:border-destructive/70",

        "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:backdrop-blur-sm",

        "relative overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent",
        "before:opacity-0 before:transition-opacity before:duration-500",
        "hover:before:opacity-100 data-[state=checked]:before:opacity-30",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={cn(
 
          "flex items-center justify-center text-current",

          "transition-all duration-300 ease-out",

          "data-[state=checked]:animate-in data-[state=checked]:zoom-in-95",
          "data-[state=unchecked]:animate-out data-[state=unchecked]:zoom-out-95",

          "relative z-10",

          "[&>svg]:drop-shadow-sm [&>svg]:filter"
        )}
      >
        <CheckIcon 
          className={cn(
            "size-4 transition-all duration-300",

            "drop-shadow-sm",

            "data-[state=checked]:scale-110"
          )}
        />
      </CheckboxPrimitive.Indicator>
      

      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent opacity-0 transition-opacity duration-500 peer-hover:opacity-100 peer-data-[state=checked]:opacity-60 rounded-t-lg" />
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
