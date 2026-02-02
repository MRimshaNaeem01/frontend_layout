import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      suppressHydrationWarning
      type={type}
      data-slot="input"
      className={cn(
        "bg-white dark:bg-white text-black dark:text-black",
        "h-12 w-full rounded-sm border border-input px-3 py-1",
        "focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent",
        className
      )}

      {...props}
    />
  )
}

export { Input }
