import ListProviderMonthAvailabilityService from "./ListProviderMonthAvailabilityService";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentRepository";
import ListProviderDayAvailabilityService from "./ListProviderDayAvailabilityService";

let listProviderDayAvailability: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe("ListProviderMonthAvailability", () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository
    );
  });

  it("should be able to list the day availability from provider", async () => {
    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 3, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      date: new Date(2020, 3, 20, 16, 0, 0),
    });

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => new Date(2020, 3, 20, 11).getTime());

    const availability = await listProviderDayAvailability.execute({
      provider_id: "user",
      year: 2020,
      month: 4,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 14, available: false },
        { hour: 15, available: true },
        { hour: 16, available: false },
        { hour: 17, available: true },
      ])
    );
  });
});
