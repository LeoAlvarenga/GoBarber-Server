import Appointment from "../infra/typeorm/entities/Appointment";
import { startOfHour, isBefore, getHours } from "date-fns";
import AppError from '@shared/errors/AppErrors'
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";
import "reflect-metadata"
import { inject, injectable } from "tsyringe";


//DTO = Data transfer Object

interface IRequestDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}
/**
 * Dependency inversion (SOLID)
 */
@injectable()
class CreateAppointmentService {
  constructor(
      @inject('AppointmentsRepository')
      private appointmentsRepository: IAppointmentsRepository
    ) {}

  public async execute({ provider_id, date, user_id }: IRequestDTO): Promise<Appointment> {

    const appointmentDate = startOfHour(date);

    if(isBefore(appointmentDate, Date.now())) throw new AppError("You Can't Create Appointments on paste date")

    if(user_id === provider_id) throw new AppError("You can't create an appointment with yourself.")

    if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) throw new AppError("You can't create an appointment out of the work hours.")

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError("this appointment is already booked");
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService
