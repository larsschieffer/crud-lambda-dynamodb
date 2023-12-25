import type { User } from "../../src/shared/user/user-model";
import data from "../../sandbox-seed.json";

const { users }: { users: User[] } = data;

export const [userFake] = users;
