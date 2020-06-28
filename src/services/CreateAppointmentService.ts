import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppoitmentsRepository";
import { startOfHour } from "date-fns";

//DTO = Data transfer Object

interface RequestDTO {
  provider: string;
  date: Date;
}
/**
 * Dependency inversion (SOLID)
 */
class CreateAppointmentService {

    private appointmentsRepository: AppointmentsRepository

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository
    }

  public execute({ provider, date }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw Error("this appointment is already booked");
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService
