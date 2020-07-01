import { Router, request, response } from "express";
import multer from 'multer'
import uploadConfig from '../config/upload'

import CreateUserService from "../services/CreateUserService";
import updateAvatarService from '../services/UpdateUserAvatarService'

import ensureAuthentication from '../middleware/ensureAuthentication'
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

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
  try {

    const updateAvatar = new UpdateUserAvatarService()

    const user = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    })

    delete user.password

    return response.json(user)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

export default usersRouter;
