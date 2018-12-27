import * as DataLoader from "dataloader";
import { User } from "../entity/User";

type BatchUser = (ids: string[]) => Promise<User[]>;

const batchusers: BatchUser = async ids => {
  console.log(ids);
  const users = await User.findByIds(ids);
  const userMap: { [key: string]: User } = {};
  users.forEach(u => {
    userMap[u.id] = u;
  });

  return ids.map(id => userMap[id]);
};

export const userLoader = () => new DataLoader<string, User>(batchusers);
