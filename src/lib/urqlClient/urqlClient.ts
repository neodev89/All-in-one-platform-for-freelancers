import { createClient, cacheExchange, fetchExchange } from "urql";

export const urqlClient = createClient({
  url: "/api/graphql",
  exchanges: [cacheExchange, fetchExchange],
});
