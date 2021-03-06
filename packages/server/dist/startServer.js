"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
require("reflect-metadata");
const graphql_middleware_1 = require("graphql-middleware");
require("dotenv/config");
const session = require("express-session");
const connectRedis = require("connect-redis");
const RateLimit = require("express-rate-limit");
const RateLimitRadisStore = require("rate-limit-redis");
const redis_1 = require("./redis");
const confirmEmail_1 = require("./routes/confirmEmail");
const createTypeormConnection_1 = require("./utils/createTypeormConnection");
const graphql_yoga_1 = require("graphql-yoga");
const genSchema_1 = require("./utils/genSchema");
const middleware_1 = require("./middleware");
const express = require("express");
const UserLoader_1 = require("./loaders/UserLoader");
const RedisStore = connectRedis(session);
const SESSION_SECRET = "fasdfasdfasdf";
const graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
exports.startServer = () => __awaiter(this, void 0, void 0, function* () {
    console.log(UserLoader_1.userLoader());
    const schema = genSchema_1.genSchema();
    graphql_middleware_1.applyMiddleware(schema, middleware_1.middleware);
    const pubsub = new graphql_redis_subscriptions_1.RedisPubSub();
    const server = new graphql_yoga_1.GraphQLServer({
        schema,
        context: ({ request, response }) => ({
            redis: redis_1.redis,
            url: request ? request.protocol + "://" + request.get("host") : "",
            session: request ? request.session : undefined,
            req: request,
            res: response,
            userLoader: UserLoader_1.userLoader(),
            pubsub
        })
    });
    server.express.use(new RateLimit({
        store: new RateLimitRadisStore({
            client: redis_1.redis
        }),
        windowMs: 15 * 60 * 1000,
        max: 100
    }));
    server.express.use(session({
        store: new RedisStore({
            client: redis_1.redis,
            prefix: constants_1.redisSessionPrefix
        }),
        name: "qid",
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    }));
    server.express.use("/images", express.static("images"));
    const cors = {
        credentials: true,
        origin: process.env.NODE_ENV === "test"
            ? "*"
            : process.env.FRONTEND_HOST
    };
    server.express.get("/confirm/:id", confirmEmail_1.confirmEmail);
    yield createTypeormConnection_1.createTypeormConnection();
    const port = process.env.PORT || 4000;
    const app = yield server.start({
        cors,
        port: process.env.NODE_ENV === "test" ? 0 : port
    });
    console.log("Server is running on localhost:4000");
    return app;
});
//# sourceMappingURL=startServer.js.map