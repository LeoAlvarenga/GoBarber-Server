import { container } from 'tsyringe';

import '@modules/users/providers'
import './providers'

import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import UsersRepository from '@modules/users/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository)
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)