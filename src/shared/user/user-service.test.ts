import sandbox from "@architect/sandbox";
import { userFake } from "../../../tests/fake/user.fake";
import {
  createUser,
  deleteUserById,
  findAllUsers,
  findUserById,
  updateUser,
} from "./user-service";
import { findUserEntryById } from "./user-repository";

describe("user-service", () => {
  beforeAll(async () => {
    await sandbox.start();
  });

  afterAll(async () => {
    await sandbox.end();
  });

  test("findAllUsers", async () => {
    // Act
    const actual = await findAllUsers();

    // Assert
    expect(actual).toContainEqual(userFake);
  });

  describe("findUserById", () => {
    test("with valid id should return user", async () => {
      // Arrange
      const id = userFake.id;

      // Act
      const actual = await findUserById(id);

      // Assert
      expect(actual).toEqual(userFake);
    });
  });

  describe("createUser", () => {
    test("with valid user should create user", async () => {
      // Arrange
      const { id, ...newUser } = userFake;

      // Act
      const actual = await createUser(newUser);

      // Assert
      const createdUser = await findUserById(actual.id);
      expect(actual).toEqual(createdUser);
    });
  });

  describe("updateUser", () => {
    test("with valid user should update stored user", async () => {
      // Arrange
      const { id, ...newUser } = userFake;
      const createdUser = await createUser(newUser);
      const userUpdate = { ...createdUser, name: "other name" };

      // Act
      await updateUser(userUpdate.id, userUpdate);

      // Assert
      const updatedUser = await findUserById(userUpdate.id);
      expect(updatedUser).toEqual(userUpdate);
    });
  });

  describe("deleteUserById", () => {
    test("with valid id should delete user", async () => {
      // Arrange
      const { id, ...newUser } = userFake;
      const createdUser = await createUser(newUser);

      // Act
      await deleteUserById(createdUser.id);

      // Assert
      expect(await findUserEntryById(createdUser.id)).toBeUndefined();
    });
  });
});
