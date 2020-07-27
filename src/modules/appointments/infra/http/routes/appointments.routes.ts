import { Router } from "express";
import { parseISO } from "date-fns";

import AppointmentsRepository from "@modules/appointments/repositories/AppointmentsRepository";
import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";

import ensureAuthentication from "@modules/users/infra/http/middleware/ensureAuthentication";
import { container } from "tsyringe";
import AppointmentsController from "../controllers/AppointmentsController";

const appoitmentsRouter = Router();
const appointmentsController = new AppointmentsController()


appoitmentsRouter.use(ensureAuthentication);

// appoitmentsRouter.get("/", ensureAuthentication, async (request, response) => {

//   //const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appoitmentsRouter.post("/", ensureAuthentication, appointmentsController.create);

export default appoitmentsRouter;
