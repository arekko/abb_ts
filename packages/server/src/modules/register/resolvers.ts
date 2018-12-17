// import { sendEmail } from './../../utils/sendEmail';
import { duplicateEmail } from "./errorMessages";
import { User } from "./../../entity/User";
import { ResolverMap } from "./../../types/graphql-utils";
import { formatYupError } from "../../utils/formatYupError";
import { createConfirmEmailLink } from "../../utils/createConfirmEmailLink";
import { sendEmail } from "../../utils/sendEmail";
import { validUserSchema } from "@abb/common";

export const resolvers: ResolverMap = {
  Query: {
    bye: () => "bye"
  },
  Mutation: {
    register: async (
      _,
      args: GQL.IRegisterOnMutationArguments,
      { redis, url }
    ) => {
      try {
        await validUserSchema.validate(args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }
      const { email, password } = args;
      const userAlreadyExists = await User.findOne({
        where: { email },
        select: ["id"]
      });
      if (userAlreadyExists) {
        return [
          {
            path: "email",
            message: duplicateEmail
          }
        ];
      }
      const user = User.create({
        email,
        password
      });
      await user.save();
      if (process.env.NODE_ENV !== "test") {
        sendEmail(email, await createConfirmEmailLink(url, user.id, redis));
      }
      return null;
    }
  }
};
