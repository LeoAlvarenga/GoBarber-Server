import { Router } from "express";
import { parseISO } from "date-fns";

import AppointmentsRepository from "../repositories/AppoitmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

const appoitmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appoitmentsRouter.get("/", (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appoitmentsRouter.post("/", (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService(
      appointmentsRepository
    );

    const appointment = createAppointmentService.execute({
      provider,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

export default appoitmentsRouter;
