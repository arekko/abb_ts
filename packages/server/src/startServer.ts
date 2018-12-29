// import { User } from "./entity/User";
import { redisSessionPrefix } from "./constants";
import "reflect-metadata";
import { applyMiddleware } from "graphql-middleware";
import "dotenv/config";

// import * as dotenv from 'dotenv';
// dotenv.config()

import * as session from "express-session";
import * as connectRedis from "connect-redis";
import * as RateLimit from "express-rate-limit";
import * as RateLimitRadisStore from "rate-limit-redis";
// import * as passport from "passport";
// import * as GoogleStrategy from "passport-google-oauth20";

import { redis } from "./redis";
import { confirmEmail } from "./routes/confirmEmail";
import { createTypeormConnection } from "./utils/createTypeormConnection";
import { GraphQLServer } from "graphql-yoga";
import { genSchema } from "./utils/genSchema";
import { middleware } from "./middleware";
import * as express from "express";
import { userLoader } from "./loaders/UserLoader";
const RedisStore = connectRedis(session);
const SESSION_SECRET = "fasdfasdfasdf";
import { RedisPubSub } from "graphql-redis-subscriptions";

export const startServer = async () => {
  console.log(userLoader());
  const schema = genSchema() as any;
  applyMiddleware(schema, middleware);

  const pubsub = new RedisPubSub();

  const server = new GraphQLServer({
    schema,
    context: ({ request, response }) => ({
      redis,
      url: request ? request.protocol + "://" + request.get("host") : "",
      session: request ? request.session : undefined,
      req: request,
      res: response,
      userLoader: userLoader(),
      pubsub
    })
  });

  server.express.use(
    new RateLimit({
      store: new RateLimitRadisStore({
        client: redis
      }),
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    })
  );

  server.express.use(
    session({
      store: new RedisStore({
        client: redis as any,
        prefix: redisSessionPrefix
      }),
      name: "qid",
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      }
    })
  );

  server.express.use("/images", express.static("images"));

  const cors = {
    credentials: true,
    origin:
      process.env.NODE_ENV === "test"
        ? "*"
        : (process.env.FRONTEND_HOST as string)
  };

  server.express.get("/confirm/:id", confirmEmail);

  // const connection = await createTypeormConnection();
  await createTypeormConnection();

  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID: process.env.GOOGLE_CLIENT_ID as string,
  //       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  //       callbackURL: "http://localhost:4000/auth/google/callback",
  //       includeEmail: true
  //     },
  //     async (_: any, __: any, profile: any, cb: any) => {
  //       const { id, emails } = profile;

  //       const query = connection
  //         .getRepository(User)
  //         .createQueryBuilder("user")
  //         .where("user.googleId = :id", { id });

  //       let email: string | null = null;

  //       if (emails) {
  //         email = emails[0].value;

  //         query.orWhere("user.email = :email", { email });
  //       }

  //       let user = await query.getOne();
  //       console.log('user', user)

  //       // this user needs to be registered
  //       if (!user) {
  //         user = await User.create({
  //           googleId: id,
  //           email
  //         }).save();
  //       } else if (!user.googleId) {
  //         // metge account
  //         user.googleId = id;
  //         user.save();
  //       } else {
  //         // we have a twitter id
  //         // login
  //       }

  //       return cb(null, { id: user.id });
  //     }
  //   )
  // );

  // server.express.use(passport.initialize());

  // server.express.get(
  //   "/auth/google",
  //   passport.authenticate("google", { scope: ["profile", "email"] })
  // );

  // server.express.get(
  //   "/auth/google/callback",
  //   passport.authenticate("google", { session: false }),
  //   (req, res) => {

  //     (req.session as any).userId = req.user.id
  //     // @todo redirect to frontend
  //     res.redirect("/");
  //   }
  // );
  const port = process.env.PORT || 4000;
  const app = await server.start({
    cors,
    port: process.env.NODE_ENV === "test" ? 0 : port
  });
  console.log("Server is running on localhost:4000");

  return app;
};
