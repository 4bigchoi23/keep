// 'use client';

import * as React from "react";
import Link from 'next/link';

export default function Keep({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1 
      className={`keep ${className ?? ''}`}
      {...props}
    >
      <Link href="/" className="keep-link">
        <span className="keep-mark"></span>
        <span className="keep-font">KEEP</span>
      </Link>
    </h1>
  );
}
