import sandbox from "@architect/sandbox";
import { userFake } from "../../../tests/fake/user.fake";
import {
  createUserEntry,
  deleteUserEntryById,
  findAllUserEntries,
  findUserEntryById,
  updateUserEntry,
} from "./user-repository";

describe("user-repository", () => {
  beforeAll(async () => {
    await sandbox.start();
  });

  afterAll(async () => {
    await sandbox.end();
  });

  test("findAllUserEntries", async () => {
    // Act
    const actual = await findAllUserEntries();

    // Assert
    expect(actual).toContainEqual(userFake);
  });

  test("findUserEntryById", async () => {
    // Arrange
    const id = userFake.id;

    // Act
    const actual = await findUserEntryById(id);

    // Assert
    expect(actual).toEqual(userFake);
  });

  test("createUserEntry", async () => {
    // Arrange
    const newUser = { ...userFake, id: undefined };

    // Act
    const actual = await createUserEntry(newUser);

    // Assert
    const createdUser = await findUserEntryById(actual.id);
    expect(actual).toEqual(createdUser);
  });

  test("updateUserEntry", async () => {
    // Arrange
    const newUser = { ...userFake, id: undefined };
    const createdUser = await createUserEntry(newUser);
    const userUpdate = { ...createdUser, name: "other name" };

    // Act
    await updateUserEntry(userUpdate.id, userUpdate);

    // Assert
    const updatedUser = await findUserEntryById(userUpdate.id);
    expect(updatedUser).toEqual(userUpdate);
  });

  test("deleteUserEntryById", async () => {
    // Arrange
    const newUser = { ...userFake, id: undefined };
    const createdUser = await createUserEntry(newUser);

    // Act
    await deleteUserEntryById(createdUser.id);

    // Assert
    expect(await findUserEntryById(createdUser.id)).toBeUndefined();
  });
});
