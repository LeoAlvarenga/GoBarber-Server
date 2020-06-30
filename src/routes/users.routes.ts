import { Router, request, response } from "express";
import CreateUserService from "../services/CreateUserService";
import multer from 'multer'
import uploadConfig from '../config/upload'

import ensureAuthentication from '../middleware/ensureAuthentication'

const usersRouter = Router();
const upload = multer(uploadConfig)


usersRouter.post("/", async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

usersRouter.patch('/avatar',ensureAuthentication, upload.single('avatar'), async (request, response) => {
  response.json({ message: 'ok' })
})

export default usersRouter;
