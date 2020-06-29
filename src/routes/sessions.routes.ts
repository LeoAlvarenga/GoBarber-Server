import { Router } from "express";

import AuthenticateUserService from '../services/AtuthenticateUserService'

const sessionsRouter = Router();

sessionsRouter.post("/", async (request, response) => {
  try {
      const { email, password } = request.body

      const authUserService = new AuthenticateUserService()

      const { user, token } = await authUserService.execute({
          email,
          password
      })

      delete user.password

    return response.json({ user, token })
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

export default sessionsRouter;
