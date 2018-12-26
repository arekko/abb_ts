import { ResolverMap } from "../../../types/graphql-utils";
import { Listing } from "../../../entity/Listing";
import * as shortid from "shortid";
import { createWriteStream } from "fs";

const storeUpload = async ({ stream, filename }: any): Promise<any> => {
  const id = shortid.generate();
  const path = `images/${id}-${filename}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ id, path }))
      .on("error", reject)
  );
};

const processUpload = async (upload: any) => {
  console.log(upload);
  const { stream, filename } = await upload;
  const { id } = await storeUpload({ stream, filename });
  return id;
};

export const resolvers: ResolverMap = {
  Mutation: {
    createListing: async (_, { input: { picture, ...data } }, { session }) => {
      // isAuthenticated(session);
      const pictureUrl = await processUpload(picture);

      // console.log(data, pictureUrl, session.userId);
      await Listing.create({
        ...data,
        pictureUrl,
        userId: session.userId
      }).save();

      console.log("before return");
      return true;
    }
  }
};
