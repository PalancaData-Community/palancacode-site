import { ReactNode } from "react";
import clsx from "clsx";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={clsx("card", className)}>{children}</div>;
}
