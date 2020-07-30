import FakeUserRepository from "../repositories/fakes/FakeUserRepository";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import AppError from "@shared/errors/AppErrors";
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe("UpdateUserAvatar", () => {
  it("should be able to create a new user avatar", async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUserRepository = new FakeUserRepository()

    const updateUserAvatar = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider)

    const user = await fakeUserRepository.create({
        name: 'leo',
        email: 'teste@mail.com',
        password: '123'
    })

    await updateUserAvatar.execute({
        user_id: user.id,
        avatarFilename: 'avatar.jpg'
    })
    

    expect(user.avatar).toBe("avatar.jpg");
  });

  it("Should not be able to update a invalid user avatar", async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUserRepository = new FakeUserRepository()

    const updateUserAvatar = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider)
    
    expect(updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'avatar.jpg'
    })).rejects.toBeInstanceOf(AppError);
  });

  it("should delete old avatar when updating a user avatar", async () => {
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeUserRepository = new FakeUserRepository()

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const updateUserAvatar = new UpdateUserAvatarService(fakeUserRepository, fakeStorageProvider)

    const user = await fakeUserRepository.create({
        name: 'leo',
        email: 'teste@mail.com',
        password: '123'
    })

    await updateUserAvatar.execute({
        user_id: user.id,
        avatarFilename: 'avatar.jpg'
    })

    await updateUserAvatar.execute({
        user_id: user.id,
        avatarFilename: 'avatar2.jpg'
    })
    
    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')

    expect(user.avatar).toBe("avatar2.jpg");

  });
});
