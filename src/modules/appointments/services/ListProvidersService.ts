import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/errors/AppErrors";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { injectable, inject } from "tsyringe";

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
  }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({ except_user_id: user_id })

    if (!users) {
      throw new AppError("User cant be found!");
    }

    return users;
  }
}

export default ListProvidersService;
