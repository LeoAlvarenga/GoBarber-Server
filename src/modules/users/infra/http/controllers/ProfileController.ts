import { Request, Response } from "express";
import { container } from "tsyringe";
import ShowProfileService from "@modules/users/services/ShowProfileService";
import UpdateProfileService from "@modules/users/services/UpdateProfileService";
import { classToClass } from 'class-transformer';

export default class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
      const user_id = request.user.id;
      try {
  
        const showProfile = container.resolve(ShowProfileService);
  
        const user = await showProfile.execute({ user_id });
  
        return response.json(classToClass(user));
      } catch (err) {
        return response.status(400).json({ message: err.message });
      }
    }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { name, email, password, old_password } = request.body;

      const updateProfile = container.resolve(UpdateProfileService);

      const user = await updateProfile.execute({
        user_id,
        name,
        email,
        old_password,
        password,
      });

      delete user.password;

      return response.json(classToClass(user));
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }
}
