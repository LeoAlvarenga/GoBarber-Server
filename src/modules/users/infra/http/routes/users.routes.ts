import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import { celebrate, Segments, Joi } from "celebrate";

import CreateUserService from "@modules/users/services/CreateUserService";

import ensureAuthentication from "@modules/users/infra/http/middleware/ensureAuthentication";
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import { container } from "tsyringe";
import UsersController from "@modules/users/infra/http/controllers/UsersController";
import UserAvatarController from "@modules/users/infra/http/controllers/UserAvatarController";

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

usersRouter.post("/", celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }
}), usersController.create);

usersRouter.patch(
  "/avatar",
  ensureAuthentication,
  upload.single("avatar"),
  userAvatarController.update
);

export default usersRouter;
