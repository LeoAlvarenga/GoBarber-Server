import { Response, Request } from "express";
import { container } from "tsyringe";
import SendForgotPasswordEmailService from "../../../services/SendForgotPasswordEmailService";

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgortService = container.resolve(SendForgotPasswordEmailService);

    await sendForgortService.execute({
      email,
    });

    return response.status(204).json();
  }
}
