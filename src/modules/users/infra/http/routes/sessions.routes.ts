import { Router } from "express";

import AuthenticateUserService from "@modules/users/services/AtuthenticateUserService";
import { container } from "tsyringe";
import SessionsController from "@modules/users/controllers/SessionsController";

const sessionsRouter = Router();
const sessionsController = new SessionsController()

sessionsRouter.post("/", sessionsController.create);

export default sessionsRouter;
