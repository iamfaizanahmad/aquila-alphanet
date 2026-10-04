"use client";

import { useEffect, useState } from "react";

/** Kalispell (America/Denver) local time, refreshed every 30s. Empty until mounted to avoid hydration mismatch. */
export function useMountainTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => {
      try {
        setT(new Date().toLocaleTimeString("en-US", { timeZone: "America/Denver", hour: "numeric", minute: "2-digit" }));
      } catch {}
    };
    tick();
    const i = setInterval(tick, 30000);
    return () => clearInterval(i);
  }, []);
  return t;
}
