import { userSessionIdPrefix } from "./../../constants";
import {
  invalidLogin,
  confirmEmailError,
  forgotPosswordLockedError
} from "./errorMessages";
import { User } from "./../../entity/User";
import { ResolverMap } from "./../../types/graphql-utils";
import * as bcrypt from "bcryptjs";

const errorResponse = [
  {
    path: "email",
    message: invalidLogin
  }
];

const passwordErrorResponse = [
  {
    path: "password",
    message: 'incorrect password'
  }
];

export const resolvers: ResolverMap = {
  Query: {
    bye2: () => "bye"
  },
  Mutation: {
    login: async (
      _,
      { email, password }: GQL.ILoginOnMutationArguments,
      { session, redis, req }
    ) => {
      const user = await User.findOne({ where: { email } });

      console.log(session);

      if (!user) {
        return { errors: errorResponse };
      }

      if (!user.confirmed) {
        return {
          errors: [
            {
              path: "email",
              message: confirmEmailError
            }
          ]
        };
      }

      if (user.forgotPasswordLocked) {
        return {
          errors: [
            {
              path: "email",
              message: forgotPosswordLockedError
            }
          ]
        };
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return { errors: passwordErrorResponse };
      }

      // login success
      session.userId = user.id;

      if (req.sessionID) {
        redis.lpush(`${userSessionIdPrefix}${user.id}`, req.sessionID);
      }

      console.log(session);

      return { sessionId: req.sessionID};
    }
  }
};
