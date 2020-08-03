import IUsersRepository from "../repositories/IUsersRepository";
import { injectable, inject } from "tsyringe";
import IEmailProvider from "@shared/container/providers/EmailProvider/models/IEmailProvider";
import AppError from "@shared/errors/AppErrors";
import IUserTokensRepository from "../repositories/IUserTokensRepository";
import path from 'path';

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

    const { token } = await this.userTokensRepository.generate(user.id)

    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs')

    this.emailProvider.sendMail(
      {
        to: {
          name: user.name,
          email: user.email
        },
        subject: '[GoBarber] Recuperação de senha',
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            name: user.name,
            link: `http://localhost:3000/reset_password?token=${token}`
          }
        }
      }
    );
  }
}

export default SendForgotPasswordEmailService;
