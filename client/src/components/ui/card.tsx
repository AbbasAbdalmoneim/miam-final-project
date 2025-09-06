import * as React from "react"
import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
 
        "relative bg-white/70 backdrop-blur-lg text-card-foreground",

        "rounded-2xl border border-white/20 shadow-2xl shadow-slate-900/10",

        "before:absolute before:inset-0 before:rounded-2xl before:p-[1px]",
        "before:bg-gradient-to-br before:from-white/40 before:via-white/10 before:to-white/5",
        "before:-z-10 before:backdrop-blur-lg",

        "flex flex-col gap-6 p-8",

        "hover:bg-white/80 hover:shadow-3xl hover:shadow-slate-900/15",
        "hover:-translate-y-1 transition-all duration-500",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(

        "relative bg-gradient-to-r from-white/30 to-white/10 backdrop-blur-md",
        "rounded-xl border border-white/20 p-6 -m-2 mb-4",
 
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-3",
        "has-data-[slot=card-action]:grid-cols-[1fr_auto]",

        "shadow-lg shadow-slate-900/5",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "leading-tight font-bold text-xl",

        "bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent",

        "hover:from-violet-600 hover:to-purple-600 transition-all duration-300",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-slate-600/80 text-base leading-relaxed",

        "relative",
        className
      )}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",

        "bg-white/40 backdrop-blur-md rounded-xl border border-white/30",
        "p-2 shadow-lg hover:bg-white/50 transition-all duration-300",
        "hover:scale-105 hover:shadow-xl",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(

        "relative",

        "before:absolute before:inset-0 before:rounded-lg",
        "before:bg-gradient-to-b before:from-white/5 before:to-transparent",
        "before:pointer-events-none",
 
        "px-2 py-1",
        className
      )}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(

        "relative bg-gradient-to-r from-white/20 to-white/5 backdrop-blur-md",
        "rounded-xl border-t border-white/20 p-6 -m-2 mt-4",

        "flex items-center justify-between",

        "shadow-inner shadow-white/20",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
