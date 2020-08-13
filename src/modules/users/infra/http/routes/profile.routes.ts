import { Router } from "express";

import ensureAuthentication from "@modules/users/infra/http/middleware/ensureAuthentication";
import { container } from "tsyringe";
import ProfileController from "../controllers/ProfileController";

const profileRouter = Router();
const profileController = new ProfileController()

profileRouter.use(ensureAuthentication)

profileRouter.get("/", profileController.show);
profileRouter.put("/", profileController.update);


export default profileRouter;
