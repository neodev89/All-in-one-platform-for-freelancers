// app/api/graphql/context.ts
import { db } from "@/db/database";
import { createPubSub } from "graphql-yoga";

export const pubsub = createPubSub();

export type GraphQLContext = {
  pubsub: typeof pubsub;
  database: typeof db;
};
