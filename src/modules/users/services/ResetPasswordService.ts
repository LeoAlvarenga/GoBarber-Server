import IUsersRepository from "../repositories/IUsersRepository";
import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppErrors";
import IUserTokensRepository from "../repositories/IUserTokensRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import { isAfter, addHours } from 'date-fns';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider,

    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
      const userToken = await this.userTokensRepository.findByToken(token)

      if(!userToken) throw new AppError('User token does not exist')
      
      const user = await this.usersRepository.findById(userToken?.user_id)
      
      if(!user) throw new AppError('User does not exist')

      const tokenCreatedAt = userToken.created_at
      const compareDate =  addHours(tokenCreatedAt, 2)

      if(isAfter(Date.now(), compareDate)) throw new AppError('Token expired')
      
      user.password = await this.hashProvider.generateHash(password)

      this.usersRepository.save(user)
  }
}

export default ResetPasswordService;
