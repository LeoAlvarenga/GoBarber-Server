import { getRepository } from "typeorm"
import User from "../models/User"
import usersRouter from "../routes/users.routes"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

interface Request {
    email: string;
    password: string;
}

class AuthenticateUserService {
    public async execute({email, password}: Request): Promise<{ user: User, token: string }> {
        const usersRepository = getRepository(User)

        const user = await usersRepository.findOne({ where: { email } })

        if(!user) {
            throw new Error('Incorrect email/password combination.')
        }
        
        const passwordMatched = await compare(password, user.password)
        
        if(!passwordMatched){
            throw new Error('Incorrect email/password combination.')
        }

        const token = sign({}, '8538607221f2e42284acf599214cfa34', {
            subject: user.id,
            expiresIn: '1d'
        })

        return {
            user,
            token
        }
    }
}

export default AuthenticateUserService