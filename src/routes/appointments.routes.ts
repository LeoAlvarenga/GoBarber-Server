import { Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from 'typeorm'

import AppointmentsRepository from "../repositories/AppoitmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

import ensureAuthentication from '../middleware/ensureAuthentication'

const appoitmentsRouter = Router();

appoitmentsRouter.use(ensureAuthentication)

appoitmentsRouter.get("/", ensureAuthentication, async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  
  const appointments = await appointmentsRepository.find();
  
  return response.json(appointments);
});

appoitmentsRouter.post("/", ensureAuthentication, async (request, response) => {
  try {
    const { provider_id, date } = request.body;
    
    const parsedDate = parseISO(date);
    
    const createAppointmentService = new CreateAppointmentService()

    const appointment = await createAppointmentService.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

export default appoitmentsRouter;
