"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_import_1 = require("graphql-import");
const path = require("path");
const fs = require("fs");
const graphql_tools_1 = require("graphql-tools");
exports.genSchema = () => {
    const schemas = [];
    const folders = fs.readdirSync(path.join(__dirname, "../modules"));
    folders.forEach(folder => {
        const { resolvers } = require(`../modules/${folder}/resolvers`);
        const typeDefs = graphql_import_1.importSchema(path.join(__dirname, `../modules/${folder}/schema.graphql`));
        schemas.push(graphql_tools_1.makeExecutableSchema({ resolvers, typeDefs }));
    });
    return graphql_tools_1.mergeSchemas({ schemas });
};
//# sourceMappingURL=genSchema.js.map