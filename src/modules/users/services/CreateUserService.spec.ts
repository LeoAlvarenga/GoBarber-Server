import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppErrors';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

describe('CreateUser', () => {
    it('Should be able to create a new user', async () => {
        const fakeUserRepository = new FakeUserRepository()
        const fakeHash = new FakeHashProvider()

        const createUser = new CreateUserService(fakeUserRepository, fakeHash)

        const user = await createUser.execute({
            name: 'leo',
            password: '123',
            email: 'teste@mail.com'
        })

        expect(user).toHaveProperty('id')
    })

    it('Should not be able to create a new user with same email from an existing user', async () => {
        const fakeUserRepository = new FakeUserRepository()
        const fakeHash = new FakeHashProvider()

        const createUser = new CreateUserService(fakeUserRepository, fakeHash)

        await createUser.execute({
            name: 'leo',
            password: '123',
            email: 'teste@mail.com'
        })

        expect(createUser.execute({
            name: 'leo',
            password: '123',
            email: 'teste@mail.com'
        })).rejects.toBeInstanceOf(AppError)
    })

    
})