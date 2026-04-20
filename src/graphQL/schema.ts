// app/api/graphql/schema.ts
import { createSchema } from "graphql-yoga";
import type { GraphQLContext } from "./context";
import { freelanceData } from "@/db/schema/freelance-data";
import { eq } from "drizzle-orm";


export const schemaGraph = createSchema<GraphQLContext>({
    typeDefs: `
    type partialFreelancePublicData = {
        tokenUser: String!
        email: String!
        name: String
        lastName: String
        pIva: String!
    }

    type Message {
      id: ID!
      text: String!
    }

    type Query {
      message: [Message!]
      freelancePublicData(tokenUser: String!): partialFreelancePublicData
    }

    type Mutation {
      sendMessage(text: String!): Message!
    }

    type Subscription {
      messageSent: Message!
    }
  `,
    resolvers: {
        Query: {
            partialFreelancePublicData: async (_, { tokenUser }, ctx) => {
                const rows = await ctx.database
                    .select({
                        tokenUser: freelanceData.tokenUser,
                        email: freelanceData.email,
                        name: freelanceData.name,
                        lastName: freelanceData.lastName,
                        pIva: freelanceData.pIva,
                    })
                    .from(freelanceData)
                    .where(eq(freelanceData.tokenUser, tokenUser));

                return rows[0] ?? null;
            },
        },
        Mutation: {
            sendMessage: (
                _,
                { text },
                ctx: GraphQLContext
            ) => {
                const msg = { id: Date.now(), text };
                ctx.pubsub.publish("MESSAGE_SENT", msg);
                return msg;
            },
        },
        Subscription: {
            messageSent: {
                subscribe: (
                    _,
                    __,
                    ctx: GraphQLContext
                ) => ctx.pubsub.subscribe("MESSAGE_SENT"),
            },
        },
    },
});
