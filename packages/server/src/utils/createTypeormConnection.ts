import { createConnection, getConnectionOptions } from "typeorm";
import { User } from "../entity/User";
import { Listing } from "../entity/Listing";
import { Message } from '../entity/Message';

export const createTypeormConnection = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return process.env.NODE_ENV === "production"
    ? createConnection({
        ...connectionOptions,
        url: process.env.DATABASE_URL as string,
        entities: [User, Listing, Message],
        name: "default"
      } as any)
    : createConnection({ ...connectionOptions, name: "default" });
};