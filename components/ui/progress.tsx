"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  color?: "blue" | "green"
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, color = "blue", ...props }, ref) => {
    const gradientClass = color === "blue" ? "from-blue-500 to-blue-600" : "from-green-500 to-green-600"

    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn("relative h-4 w-full overflow-hidden rounded-full bg-gray-100", className)}
        {...props}
      >
        <motion.div
          className={`h-full w-full flex-1 bg-gradient-to-r ${gradientClass}`}
          style={{ transformOrigin: "0% 50%" }}
          initial={{ transform: "translateX(-100%)" }}
          animate={{ transform: `translateX(-${100 - (value || 0)}%)` }}
          transition={{ duration: 0.3 }}
        />
      </ProgressPrimitive.Root>
    )
  },
)
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
