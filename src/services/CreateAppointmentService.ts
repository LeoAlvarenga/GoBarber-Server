import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppoitmentsRepository";
import { startOfHour } from "date-fns";
import { getCustomRepository } from 'typeorm'

//DTO = Data transfer Object

interface RequestDTO {
  provider_id: string;
  date: Date;
}
/**
 * Dependency inversion (SOLID)
 */
class CreateAppointmentService {

  public async execute({ provider_id, date }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw Error("this appointment is already booked");
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment)

    return appointment;
  }
}

export default CreateAppointmentService
