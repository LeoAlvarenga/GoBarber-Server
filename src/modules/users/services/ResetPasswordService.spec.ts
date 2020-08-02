import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import AppError from "@shared/errors/AppErrors";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import ResetPasswordService from "./ResetPasswordService";
import FakeUserTokensRepository from "@modules/users/repositories/fakes/FakeUserTokensRepository";

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;

describe("ResetPasswordService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    resetPassword = new ResetPasswordService(
      fakeUserRepository,
      fakeHashProvider,
      fakeUserTokensRepository
    );
  });

  it("Should be able to reset the password", async () => {
    const user = await fakeUserRepository.create({
      name: "fulano",
      email: "teste@mail.com",
      password: "123",
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, "generateHash");

    await resetPassword.execute({
      password: "123123",
      token,
    });

    const updatedUser = await fakeUserRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith("123123");
    expect(updatedUser?.password).toBe("123123");
  });

  it("Should not be able to reset the password with non-existing token", async () => {
    expect(
      resetPassword.execute({
        token: "non-existing-token",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to reset the password with non-existing user", async () => {
    const { token } = await fakeUserTokensRepository.generate(
      "non-existing-user"
    );

    expect(
      resetPassword.execute({
        token,
        password: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to reset password if passed more than 2 hours", async () => {
    const user = await fakeUserRepository.create({
      name: "fulano",
      email: "teste@mail.com",
      password: "123",
    });

    const { token } = await fakeUserTokensRepository.generate(user.id)

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        const customDate = new Date();

        return customDate.setHours(customDate.getHours() + 3)
    })

    await expect(
        resetPassword.execute({
            token,
            password: '123123'
        })
    ).rejects.toBeInstanceOf(AppError)

  });
});
