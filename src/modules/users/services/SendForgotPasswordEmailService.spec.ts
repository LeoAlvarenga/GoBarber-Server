import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppErrors';
import CreateUserService from './CreateUserService';
import FakeEmailProvider from '@shared/container/providers/EmailProvider/fakes/FakeEmailProvider'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository'

let fakeUserRepository: FakeUserRepository
let fakeEmailProvider: FakeEmailProvider
let fakeUserTokensRepository: FakeUserTokensRepository
let sendForgotPassword: SendForgotPasswordEmailService

describe('SendForgotPasswordEmail', () => {
    
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository()
        fakeEmailProvider = new FakeEmailProvider()
        fakeUserTokensRepository = new FakeUserTokensRepository()
        sendForgotPassword = new SendForgotPasswordEmailService(fakeUserRepository, fakeEmailProvider, fakeUserTokensRepository)

    })

    it('Should be able to recover the password using the email', async () => {
        const sendMail = jest.spyOn(fakeEmailProvider, 'sendMail')

        await fakeUserRepository.create({
            name: 'fulano',
            email: 'teste@mail.com',
            password: '123'
        })

         await sendForgotPassword.execute({
            email: 'teste@mail.com'
        })

        expect(sendMail).toHaveBeenCalled()
    })

    it('Should not be able to recover a non-existing user password', async () => {

        await expect(sendForgotPassword.execute({
            email: 'teste@mail.com'
        })).rejects.toBeInstanceOf(AppError) 
    })

    it('Should generate a forgot password token', async () => {

        const sendMail = jest.spyOn(fakeEmailProvider, 'sendMail')
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate')

        const user = await fakeUserRepository.create({
            name: 'fulano',
            email: 'teste@mail.com',
            password: '123'
        })

         await sendForgotPassword.execute({
            email: 'teste@mail.com'
        })

        expect(generateToken).toHaveBeenCalledWith(user.id)
    })

    
})