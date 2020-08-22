import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUserRepository";
import AppError from "@shared/errors/AppErrors";
import ListProvidersService from "./ListProvidersService";

let fakeUserRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe("ListProviders", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUserRepository);
  });

  it("should be able to list the providers", async () => {
    const user1 = await fakeUserRepository.create({
      name: "leo",
      email: "teste@mail.com",
      password: "123",
    });

    const user2 = await fakeUserRepository.create({
      name: "leleco",
      email: "teste2@mail.com",
      password: "123",
    });

    const loggedUser = await fakeUserRepository.create({
      name: "leonardo",
      email: "teste3@mail.com",
      password: "123",
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
