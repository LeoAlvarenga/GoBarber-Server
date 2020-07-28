import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository'

describe('CreateAppointmentService', () => {
    it('Should be able to create a new appointment', async () => {
        const fakeAppointmentRepository = new FakeAppointmentRepository()
        const createAppointment = new CreateAppointmentService(fakeAppointmentRepository)

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '123'
        })

        expect(appointment).toHaveProperty('id')
    })

    // it('Should not be able to create two appointments at the same date/time', () => {

    // })
})