import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";

import CreateUserService from "@modules/users/services/CreateUserService";

import ensureAuthentication from "@modules/users/infra/http/middleware/ensureAuthentication";
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import { container } from "tsyringe";
import UsersController from "@modules/users/controllers/UsersController";
import UserAvatarController from "@modules/users/controllers/UserAvatarController";

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

usersRouter.post("/", usersController.create);

usersRouter.patch(
  "/avatar",
  ensureAuthentication,
  upload.single("avatar"),
  userAvatarController.update
);

export default usersRouter;
