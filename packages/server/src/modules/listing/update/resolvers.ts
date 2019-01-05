import { ResolverMap } from "../../../types/graphql-utils";
import { Listing } from "../../../entity/Listing";
import { processUpload } from "../shared/processUpload";
import { getConnection } from "typeorm";
import { listingCacheKey } from "../../../constants";

export const resolvers: ResolverMap = {
  Mutation: {
    updateListing: async (
      _,
      { listingId, input: { picture, ...data } },
      { redis }
    ) => {
      // console.log(data, pictureUrl, session.userId);cisting
      if (picture) {
        data.pictureUrl = await processUpload(picture);
      }
      console.log(listingId);
      await Listing.update(
        {
          id: listingId
        },
        {
          ...data
        }
      );
      const {
        raw: [newListing]
      } = await getConnection()
        .createQueryBuilder()
        .update(Listing)
        .set(data)
        .where("id = :id", { id: listingId })
        .returning("*")
        .execute();

      const listings = await redis.lrange(listingCacheKey, 0, -1);
      const idx = listings.findIndex(
        (x: string) => JSON.stringify(x) === listingId
      );
      await redis.lset(listingCacheKey, idx, JSON.stringify(newListing));

      console.log("before return");
      return true;
    }
  }
};
