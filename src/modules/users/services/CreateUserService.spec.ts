import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppErrors';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
    it('Should be able to create a new user', async () => {
        const fakeUserRepository = new FakeUserRepository()
        const createUser = new CreateUserService(fakeUserRepository)

        const user = await createUser.execute({
            name: 'leo',
            password: '123',
            email: 'teste@mail.com'
        })

        expect(user).toHaveProperty('id')
    })

    it('Should not be able to create a new user with same email from an existing user', async () => {
        const fakeUserRepository = new FakeUserRepository()
        const createUser = new CreateUserService(fakeUserRepository)

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