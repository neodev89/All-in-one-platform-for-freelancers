"use client";

import { urqlClient } from "@/lib/urqlClient/urqlClient";
import { Provider } from "urql";

export function UrqlProvider({ children }: { children: React.ReactNode }) {
  return <Provider value={urqlClient}>{children}</Provider>;
}
