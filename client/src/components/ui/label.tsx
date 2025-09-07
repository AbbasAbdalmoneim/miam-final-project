import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(

        "relative inline-flex items-center gap-2 px-4 py-2",

        "bg-white/60 backdrop-blur-lg border border-white/30 rounded-xl shadow-lg shadow-slate-900/5",

        "text-sm font-semibold text-slate-800 leading-none select-none",

        "transition-all duration-500 ease-out",
        "hover:bg-white/80 hover:border-white/50 hover:shadow-xl hover:shadow-slate-900/10 hover:scale-105",

        "focus-within:ring-4 focus-within:ring-primary/20 focus-within:ring-offset-2 focus-within:ring-offset-background",
        "focus-within:border-primary/60 focus-within:bg-white/90",

        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-40",
        "group-data-[disabled=true]:bg-slate-100/40 group-data-[disabled=true]:backdrop-blur-sm",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-40",

        "dark:bg-slate-800/60 dark:border-slate-600/30 dark:text-slate-200",
        "dark:shadow-slate-900/20 dark:hover:bg-slate-700/70 dark:hover:border-slate-500/40",

        "overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:via-white/5 before:to-transparent",
        "before:opacity-0 before:transition-opacity before:duration-500 before:pointer-events-none",
        "hover:before:opacity-100",
        className
      )}
      {...props}
    />
  )
}


function GradientLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="gradient-label"
      className={cn(

        "relative inline-flex items-center gap-2 px-4 py-2",

        "bg-white/40 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg shadow-slate-900/5",
  
        "bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent",
        "text-sm font-bold leading-none select-none",

        "transition-all duration-500 ease-out",
        "hover:bg-white/60 hover:border-white/40 hover:shadow-xl hover:scale-105",
        "hover:from-violet-700 hover:via-purple-700 hover:to-pink-700",

        "focus-within:ring-4 focus-within:ring-violet-500/20 focus-within:ring-offset-2",
        "focus-within:border-violet-400/60 focus-within:bg-white/70",

        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-40",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-40",

        "dark:bg-slate-800/40 dark:border-slate-600/20",
        "dark:from-violet-400 dark:via-purple-400 dark:to-pink-400",

        "overflow-hidden",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent",
        "before:opacity-0 before:transition-opacity before:duration-500 before:pointer-events-none",
        "hover:before:opacity-100",
        className
      )}
      {...props}
    />
  )
}

export { Label, GradientLabel }
