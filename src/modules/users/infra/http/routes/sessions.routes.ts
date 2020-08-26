import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";
import { container } from "tsyringe";
import SessionsController from "@modules/users/infra/http/controllers/SessionsController";

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create
);

export default sessionsRouter;
