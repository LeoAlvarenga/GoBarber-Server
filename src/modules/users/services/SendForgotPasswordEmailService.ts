import IUsersRepository from "../repositories/IUsersRepository";
import { injectable, inject } from "tsyringe";
import IEmailProvider from "@shared/container/providers/EmailProvider/models/IEmailProvider";
import AppError from "@shared/errors/AppErrors";
import IUserTokensRepository from "../repositories/IUserTokensRepository";

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("EmailProvider")
    private emailProvider: IEmailProvider,

    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exist");
    }

    await this.userTokensRepository.generate(user.id)

    this.emailProvider.sendMail(
      email,
      "pedido de recuperação de senha recebido"
    );
  }
}

export default SendForgotPasswordEmailService;
