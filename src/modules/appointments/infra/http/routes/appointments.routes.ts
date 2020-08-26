import { Router } from "express";
import { celebrate, Segments, Joi } from 'celebrate';

import AppointmentsRepository from "@modules/appointments/repositories/AppointmentsRepository";
import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";

import ensureAuthentication from "@modules/users/infra/http/middleware/ensureAuthentication";
import { container } from "tsyringe";
import AppointmentsController from "../controllers/AppointmentsController";
import ProviderAppointmentsController from "../controllers/ProviderAppointmentsController";

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController()
const providerAppointmentsController = new ProviderAppointmentsController()


appointmentsRouter.use(ensureAuthentication);

// appointmentsRouter.get("/", ensureAuthentication, async (request, response) => {

//   //const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post("/", celebrate({
    [Segments.BODY] : {
        provider_id: Joi.string().uuid().required(),
        date: Joi.date().required(),
    }
}), appointmentsController.create);
appointmentsRouter.get("/me", providerAppointmentsController.index);

export default appointmentsRouter;
