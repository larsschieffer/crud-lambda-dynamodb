import { randomUUID } from "crypto";
import type { User } from "./user-model";
import { tables } from "@architect/functions";
import type { ArcTable } from "@architect/functions/types/tables";

async function tableOperations(): Promise<ArcTable<User>> {
  const { users } = await tables();

  return users;
}

export async function findAllUserEntries(): Promise<User[]> {
  const table = await tableOperations();
  const response = await table.scan({});

  return response.Items as User[];
}

export async function findUserEntryById(id: string): Promise<User | undefined> {
  const table = await tableOperations();

  return table.get({ id });
}

export async function createUserEntry(user: Omit<User, "id">): Promise<User> {
  const createdUser = {
    ...user,
    id: randomUUID(),
  };

  const table = await tableOperations();
  return table.put(createdUser);
}

export async function updateUserEntry(id: string, user: User): Promise<User> {
  const updatedUser = {
    ...user,
    id,
  };

  const table = await tableOperations();
  return table.put(updatedUser);
}

export async function deleteUserEntryById(id: string): Promise<string> {
  const table = await tableOperations();
  await table.delete({ id });

  return id;
}
