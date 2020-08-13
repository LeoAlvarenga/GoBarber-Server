import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import UpdateProfileService from "./UpdateProfileService";
import AppError from "@shared/errors/AppErrors";

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe("UpdateProfile", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider
    );
  });

  it("should be able to update a profile", async () => {
    const user = await fakeUserRepository.create({
      name: "leo",
      email: "teste@mail.com",
      password: "123",
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "leleco",
      email: "update@mail.com",
    });

    expect(updatedUser.name).toBe("leleco");
    expect(updatedUser.email).toBe("update@mail.com");
  });

  it("should not be able to show a non-existing profile", async () => {
    await expect(
      updateProfile.execute({
        user_id: "non_existing_user_id",
        name: 'teste',
        email: 'teste'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  
  it("Should not be able to change to another user email", async () => {
      await fakeUserRepository.create({
          name: "teste",
          email: "update@mail.com",
          password: "123",
        });
        
        const user = await fakeUserRepository.create({
            name: "leo",
            email: "teste@mail.com",
            password: "123",
        });
        
        await expect(updateProfile.execute({
            user_id: user.id,
            name: "leleco",
            email: "update@mail.com",
        })).rejects.toBeInstanceOf(AppError)
        
    });
    
    it("should be able to update the password", async () => {
      const user = await fakeUserRepository.create({
        name: "leo",
        email: "teste@mail.com",
        password: "123",
      });
    
      const updatedUser = await updateProfile.execute({
        user_id: user.id,
        name: "leleco",
        email: "update@mail.com",
        old_password: '123',
        password: '123123'
      });
    
      expect(updatedUser.password).toBe("123123");
    });
    
    it("should not be able to update the password without provide the old password", async () => {
      const user = await fakeUserRepository.create({
        name: "leo",
        email: "teste@mail.com",
        password: "123",
      });
    
      await expect(updateProfile.execute({
        user_id: user.id,
        name: "leleco",
        email: "update@mail.com",
        password: '123123'
      })).rejects.toBeInstanceOf(AppError)
    
    });
    
    it("should not be able to update the password with wrong old password", async () => {
      const user = await fakeUserRepository.create({
        name: "leo",
        email: "teste@mail.com",
        password: "123",
      });
    
      await expect(updateProfile.execute({
        user_id: user.id,
        name: "leleco",
        email: "update@mail.com",
        old_password: 'wrong password',
        password: '123123'
      })).rejects.toBeInstanceOf(AppError)
    
    });

    
});
