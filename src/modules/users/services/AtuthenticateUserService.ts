import { getRepository } from "typeorm"
import User from "../infra/typeorm/entities/User"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import authConfig from '../../../config/auth'
import AppError from '../../../shared/errors/AppErrors'
import IUsersRepository from "../repositories/IUsersRepository"
import { injectable, inject } from "tsyringe"

interface IRequest {
    email: string;
    password: string;
}
@injectable()
class AuthenticateUserService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ){}

    public async execute({email, password}: IRequest): Promise<{ user: User, token: string }> {

        const user = await this.usersRepository.findByEmail(email)

        if(!user) {
            throw new AppError('Incorrect email/password combination.')
        }
        
        const passwordMatched = await compare(password, user.password)
        
        if(!passwordMatched){
            throw new AppError('Incorrect email/password combination.')
        }

        const { secret, expiresIn } = authConfig.jwt

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn
        })

        return {
            user,
            token
        }
    }
}

export default AuthenticateUserService