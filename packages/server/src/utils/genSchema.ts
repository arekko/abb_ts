// import { importSchema } from "graphql-import";
// import * as path from "path";
// import * as fs from "fs";
// import { mergeSchemas, makeExecutableSchema } from "graphql-tools";
// import { GraphQLSchema } from "graphql";

// export const genSchema = () => {
//   const schemas: GraphQLSchema[] = [];
//   const folders = fs.readdirSync(path.join(__dirname, "../modules"));
//   folders.forEach(folder => {
//     const { resolvers } = require(`../modules/${folder}/resolvers`);
//     const typeDefs = importSchema(
//       path.join(__dirname, `../modules/${folder}/schema.graphql`)
//     );
//     schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
//   });

//   return mergeSchemas({ schemas });
// };

import { mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import * as path from "path";
import * as fs from "fs";
import { makeExecutableSchema } from "graphql-tools";
import * as glob from "glob";

export const genSchema = () => {
  const pathToModules = path.join(__dirname, "../modules");
  const graphqlTypes = glob
    .sync(`${pathToModules}/**/*.graphql`)
    .map(x => fs.readFileSync(x, { encoding: "utf8" }));

  const resolvers = glob
    .sync(`${pathToModules}/**/resolvers.?s`)
    .map(resolver => require(resolver).resolvers);

  return makeExecutableSchema({
    typeDefs: mergeTypes(graphqlTypes),
    resolvers: mergeResolvers(resolvers)
  });
};