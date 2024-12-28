"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function NarwhalIcon({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = React.useState(false);
  const { theme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and hydration render with a default color
  if (!mounted) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        strokeWidth="1.5"
      >
        <path
          d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M21 5V3M21 3H19M21 3L18 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 8.67709C10.8665 8.26188 11.4027 8 12 8C13.1046 8 14 8.89543 14 10C14 10.5973 13.7381 11.1335 13.3229 11.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8.5 14C8.5 14 9 16 12 16C15 16 15.5 14 15.5 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  const strokeColor = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="1.5"
    >
      <path
        d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M21 5V3M21 3H19M21 3L18 6"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 8.67709C10.8665 8.26188 11.4027 8 12 8C13.1046 8 14 8.89543 14 10C14 10.5973 13.7381 11.1335 13.3229 11.5"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8.5 14C8.5 14 9 16 12 16C15 16 15.5 14 15.5 14"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
} 