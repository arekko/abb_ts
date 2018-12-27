import { ResolverMap } from "../../../types/graphql-utils";
import { Listing } from "../../../entity/Listing";
import * as shortid from "shortid";
import { createWriteStream } from "fs";

const storeUpload = async (stream: any, mimetype: string): Promise<any> => {
  const extension = mimetype.split("/")[1];
  const id = `${shortid.generate()}.${extension}`;
  const path = `images/${id}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ id, path }))
      .on("error", reject)
  );
};

const processUpload = async (upload: any) => {
  const { stream, mimetype } = await upload;
  const { id } = await storeUpload(stream, mimetype);
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
