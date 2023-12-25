import invariant from "tiny-invariant";
import { userSchema, type User, userCreationSchema } from "./user-model";
import {
  createUserEntry,
  deleteUserEntryById,
  findAllUserEntries,
  findUserEntryById,
  updateUserEntry,
} from "./user-repository";
import { EntityNotFoundError } from "../common/error";

export async function findAllUsers(): Promise<User[]> {
  return await findAllUserEntries();
}

export async function findUserById(id: string | undefined): Promise<User> {
  invariant(id);

  const user = await findUserEntryById(id);

  if (!user) {
    throw new EntityNotFoundError();
  }

  return user;
}

export async function createUser(user: Omit<User, "id">): Promise<User> {
  userCreationSchema.parse(user);

  return await createUserEntry(user);
}

export async function updateUser(
  id: string | undefined,
  user: User,
): Promise<User> {
  invariant(id);
  userSchema.parse(user);

  return await updateUserEntry(id, user);
}

export async function deleteUserById(id: string | undefined): Promise<string> {
  invariant(id);

  return await deleteUserEntryById(id);
}
