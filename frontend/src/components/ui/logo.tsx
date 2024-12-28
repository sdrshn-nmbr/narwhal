"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function Logo({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = React.useState(false);
  const { theme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and hydration render with a default color
  if (!mounted) {
    return (
      <svg
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
          points="12 18.63 18.84 15.21 18.84 7.68 12 4.32 5.16 7.68 5.16 15.21 12 18.63"
        />
        <polyline
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
          points="5.16 8.09 5.19 8.09 12 11.46 12 18.84"
        />
        <polyline
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
          points="12 18.84 12 11.46 18.81 8.09 18.84 8.09"
        />
        <polyline
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
          points="18.84 8.09 18.81 8.09 12 11.46 5.19 8.09 5.16 8.09"
        />
        <polyline
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
          points="1.25 6.14 1.25 1.25 6.14 1.25"
        />
        <polyline
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
          points="6.14 22.75 1.25 22.75 1.25 17.86"
        />
        <polyline
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
          points="22.75 17.86 22.75 22.75 17.86 22.75"
        />
        <polyline
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
          points="17.86 1.25 22.75 1.25 22.75 6.14"
        />
      </svg>
    );
  }

  const strokeColor = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <svg
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        fill="none"
        stroke={strokeColor}
        strokeMiterlimit="10"
        points="12 18.63 18.84 15.21 18.84 7.68 12 4.32 5.16 7.68 5.16 15.21 12 18.63"
      />
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeMiterlimit="10"
        points="5.16 8.09 5.19 8.09 12 11.46 12 18.84"
      />
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeMiterlimit="10"
        points="12 18.84 12 11.46 18.81 8.09 18.84 8.09"
      />
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeMiterlimit="10"
        points="18.84 8.09 18.81 8.09 12 11.46 5.19 8.09 5.16 8.09"
      />
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeMiterlimit="10"
        points="1.25 6.14 1.25 1.25 6.14 1.25"
      />
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeMiterlimit="10"
        points="6.14 22.75 1.25 22.75 1.25 17.86"
      />
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeMiterlimit="10"
        points="22.75 17.86 22.75 22.75 17.86 22.75"
      />
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeMiterlimit="10"
        points="17.86 1.25 22.75 1.25 22.75 6.14"
      />
    </svg>
  );
} 