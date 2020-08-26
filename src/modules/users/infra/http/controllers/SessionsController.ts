import { Response, Request } from "express";
import { container } from "tsyringe";
import AuthenticateUserService from "../../../services/AuthenticateUserService";
import { classToClass } from 'class-transformer';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authUserService = container.resolve(AuthenticateUserService);

    const { user, token } = await authUserService.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}
