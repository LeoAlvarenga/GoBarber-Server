import { getRepository, Repository, Raw } from "typeorm";
import Appointment from "../infra/typeorm/entities/Appointment";
import IAppointmentsRepository from "./IAppointmentsRepository";
import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";
import { IFindAllInMonthFromProviderDTO } from "../dtos/IFindAllInMonthFromProviderDTO";
import IFindAllInDayFromProviderDTO from "../dtos/IFindAllInDayFromProviderDTO";

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment || undefined;
  }

  public async findAllInMonthFromProvider({ month, provider_id, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2,'0')

    const appointments = await this.ormRepository.find({
      where: { 
        provider_id,
        date: Raw(dateFieldName => 
          `to_char(${dateFieldName}, 'MM-YYYY') = ${parsedMonth}-${year} `)
       },
    });

    return appointments;
  }

  public async findAllInDayFromProvider({ month, provider_id, year, day }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2,'0')
    const parsedMonth = String(month).padStart(2,'0')

    const appointments = await this.ormRepository.find({
      where: { 
        provider_id,
        date: Raw(dateFieldName => 
          `to_char(${dateFieldName}, 'DD-MM-YYYY') = ${parsedDay}-${parsedMonth}-${year} `)
       },
    });

    return appointments;
  }

  public async create({
    provider_id,
    date,
    user_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
