import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const Container = forwardRef<HTMLElement, ContainerProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("mx-auto max-w-7xl px-6 py-4", className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Container.displayName = "Container";

export default Container;
