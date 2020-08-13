import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import UpdateProfileService from "./UpdateProfileService";
import AppError from "@shared/errors/AppErrors";
import ShowProfileService from "./ShowProfileService";

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileService;

describe("ShowProfile", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    showProfile = new ShowProfileService(fakeUserRepository);
  });

  it("should be able to show the profile", async () => {
    const user = await fakeUserRepository.create({
      name: "leo",
      email: "teste@mail.com",
      password: "123",
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe("leo");
    expect(profile.email).toBe("teste@mail.com");
  });

  it("should not be able to show a non-existing profile", async () => {
    await expect(
      showProfile.execute({
        user_id: "user_id",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
