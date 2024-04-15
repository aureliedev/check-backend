import { DataSource } from "typeorm";
import { Country } from "./entities/Country";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { CountryResolvers } from "./resolvers/CountryResolvers";

async function main() {
  const dataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    entities: [Country],
    synchronize: true,
  });
  await dataSource.initialize();

  const schema = await buildSchema({ resolvers: [CountryResolvers] });
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

main();
