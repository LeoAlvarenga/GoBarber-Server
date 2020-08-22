import { Router } from "express";

import ensureAuthentication from "@modules/users/infra/http/middleware/ensureAuthentication";
import ProvidersController from "../controllers/ProvidersController";

const providersRouter = Router();
const providersController = new ProvidersController()


providersRouter.use(ensureAuthentication);

providersRouter.get("/", ensureAuthentication, providersController.create);

export default providersRouter;
