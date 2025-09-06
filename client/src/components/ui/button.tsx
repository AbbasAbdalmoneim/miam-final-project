import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(

  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-500 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive backdrop-blur-sm transform hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
      
          "bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:from-primary hover:via-primary/95 hover:to-primary border border-white/20 backdrop-blur-md relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:via-transparent before:to-white/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        
        destructive:
     
          "bg-gradient-to-r from-destructive via-red-500 to-destructive text-white shadow-xl shadow-destructive/30 hover:shadow-2xl hover:shadow-destructive/50 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 border border-red-400/20 backdrop-blur-md relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:via-transparent before:to-white/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        
        outline:

          "border-2 bg-white/70 backdrop-blur-lg shadow-lg shadow-slate-900/5 hover:shadow-xl hover:shadow-slate-900/10 hover:bg-white/90 text-slate-700 hover:text-slate-900 border-slate-200/60 hover:border-slate-300/80 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:via-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        
        secondary:

          "bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30 backdrop-blur-sm border border-white/20 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:via-transparent before:to-white/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        
        ghost:
  
          "bg-white/20 backdrop-blur-md hover:bg-white/30 text-slate-700 hover:text-slate-900 border border-white/20 hover:border-white/40 shadow-md hover:shadow-lg relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:via-transparent before:to-white/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        
        link: 
 
          "text-primary underline-offset-4 hover:underline bg-transparent hover:bg-primary/5 px-2 py-1 rounded-lg transition-all duration-300 relative overflow-hidden",
      },
      size: {
        default: "h-11 px-6 py-3 has-[>svg]:px-5",
        sm: "h-9 rounded-xl gap-1.5 px-4 py-2 text-xs has-[>svg]:px-3",
        lg: "h-13 rounded-2xl px-8 py-4 text-base has-[>svg]:px-6",
        icon: "size-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
