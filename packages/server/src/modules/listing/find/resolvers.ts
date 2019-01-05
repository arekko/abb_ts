import { ResolverMap } from "../../../types/graphql-utils";
import { listingCacheKey } from "../../../constants";

export const resolvers: ResolverMap = {
  Listing: {
    pictureUrl: (parent, _, { url }) =>
      parent.pictureUrl && `${url}/images/${parent.pictureUrl}`,
    owner: ({ userId }, _, { userLoader }) => userLoader.load(userId)
  },

  Query: {
    findListings: async (_, __, { redis }) => {
      console.time("redis");
      const listings = (await redis.lrange(listingCacheKey, 0, -1)) || [];
      const result = listings.map((x: any) => JSON.parse(x));
      console.timeEnd("redis");
      return result;
    }
  }
};
