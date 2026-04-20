// app/api/graphql/route.ts
import { createYoga, createPubSub } from "graphql-yoga";
import { schemaGraph } from "./schema";
import { GraphQLContext } from "./context";
import { db } from "@/db/database";

const pubsub = createPubSub();

const yoga = createYoga<GraphQLContext>({
  schema: schemaGraph,
  graphqlEndpoint: "/api/graphql",
  context: () => ({ pubsub, database: db }), // <-- qui passa il pubsub
});

export { yoga as GET, yoga as POST };
