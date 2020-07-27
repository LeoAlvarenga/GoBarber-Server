import Appointment from "../infra/typeorm/entities/Appointment";
import { startOfHour } from "date-fns";
import AppError from '@shared/errors/AppErrors'
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";
import { inject, injectable } from "tsyringe";


//DTO = Data transfer Object

interface IRequestDTO {
  provider_id: string;
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

  public async execute({ provider_id, date }: IRequestDTO): Promise<Appointment> {

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError("this appointment is already booked");
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService
