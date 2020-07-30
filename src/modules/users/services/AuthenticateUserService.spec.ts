import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import AppError from "@shared/errors/AppErrors";

describe("AuthenticateUser", () => {
  it("should be able to authenticate", async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHash = new FakeHashProvider();
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHash
    );
    const createUser = new CreateUserService(fakeUserRepository, fakeHash);

    await createUser.execute({
      name: "leo",
      password: "123",
      email: "teste@mail.com",
    });

    const response = await authenticateUserService.execute({
      password: "123",
      email: "teste@mail.com",
    });

    expect(response).toHaveProperty("token");
  });

  it("Should not be able to authenticate with non existing user", async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHash = new FakeHashProvider();
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHash
    );

    expect(
      authenticateUserService.execute({
        password: "123",
        email: "teste@mail.com",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with a wrong password", async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHash = new FakeHashProvider();
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHash
    );
    const createUser = new CreateUserService(fakeUserRepository, fakeHash);

    await createUser.execute({
      name: "leo",
      password: "123",
      email: "teste@mail.com",
    });

    expect(authenticateUserService.execute({
      password: "123456",
      email: "teste@mail.com",
    })).rejects.toBeInstanceOf(AppError)

  });
});
