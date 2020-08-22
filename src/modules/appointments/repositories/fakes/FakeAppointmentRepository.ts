import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import IAppointmentsRepository from "../IAppointmentsRepository";
import ICreateAppointmentDTO from "../../dtos/ICreateAppointmentDTO";
import { uuid } from "uuidv4";
import { isEqual, getMonth, getYear } from "date-fns";
import { IFindAllInMonthFromProviderDTO } from "@modules/appointments/dtos/IFindAllInMonthFromProviderDTO";

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = this.appointments.find((appointment) =>
      isEqual(appointment.date, date)
    );

    return appointment;
  }

  public async findAllInMonthFromProvider({
    month,
    provider_id,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
    );

    return appointments;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    appointment.id = uuid();
    appointment.date = date;
    appointment.provider_id = provider_id;

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
