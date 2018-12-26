import { removeAllUsersSessions } from '../../../utils/removeAllUsersSessions';
import { ResolverMap } from "../../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Mutation: {
    logout: async (_, __, { session, redis }) => {

      const { userId } = session;
      if (userId) {
        removeAllUsersSessions(userId, redis);
        return true;
      }

      return false;
    }
  }
};
