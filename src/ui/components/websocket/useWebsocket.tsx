"use client";

import { useGet } from "@/tanstack/get/get-mutation";
import { useEffect, useState } from "react";


export function useCallWebSocket<T extends Record<string, unknown>>(urlWs: string): {
  data: T[];
  token: string | null;
} {
  const [data, setData] = useState<Array<T>>([]);
  const [token, setToken] = useState<string | null>(null);

  const getToken = useGet<string>({
    url: '/api/cookies',
    key: ['get-auth-token'],
    enabled: true,
  });

  useEffect(() => {
    if (!getToken.data?.data) return;

    const userToken = getToken.data.data;
    const parsedUserToken = JSON.parse(userToken);
    const ws = new WebSocket(urlWs);

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "auth",
        data: parsedUserToken,
      }));
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);

        switch (payload.type) {
          case "auth:ok":
            setToken(payload.token);
            break;

          case "invoices":
            if (Array.isArray(payload.data)) {
              setData(payload.data);
            }
            break;

          default:
            console.warn("Messaggio WS non riconosciuto:", payload);
        }
      } catch (error) {
        console.error("Errore parsing WebSocket:", error);
      }
    };

    return () => ws.close();
  }, [urlWs, getToken.data]);

  return { data, token };
}
