import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  titleMb?: string;
  descriptionMaxW?: string;
  descriptionMb?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  titleMb = "mb-3 md:mb-4",
  descriptionMaxW = "max-w-lg",
  descriptionMb = "mb-8 md:mb-10",
}: SectionHeaderProps) {
  const center = align === "center";
  return (
    <>
      <p
        className={cn(
          "text-xs sm:text-sm font-medium text-primary tracking-wider uppercase mb-3 md:mb-4",
          center && "text-center"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground",
          titleMb,
          center && "text-center"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-muted-foreground text-sm md:text-base lg:text-lg",
            descriptionMaxW,
            descriptionMb,
            center && "mx-auto text-center"
          )}
        >
          {description}
        </p>
      )}
    </>
  );
}
