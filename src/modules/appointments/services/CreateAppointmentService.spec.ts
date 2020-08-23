import CreateAppointmentService from "./CreateAppointmentService";
import FakeAppointmentRepository from "../repositories/fakes/FakeAppointmentRepository";
import AppError from "@shared/errors/AppErrors";

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

describe("CreateAppointmentService", () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentRepository);
  });

  it("Should be able to create a new appointment", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 14),
      provider_id: "123",
      user_id: "user",
    });

    expect(appointment).toHaveProperty("id");
  });

  it("Should not be able to create two appointments at the same date/time", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointmentDate = new Date(2020, 4, 10, 13);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: "123",
      user_id: "user",
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: "123",
        user_id: "user",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create an appointment on a past date", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: "123",
        user_id: "user",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create an appointment with same user as provider", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        provider_id: "123",
        user_id: "123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create an appointment outside the work hours", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        provider_id: "123",
        user_id: "user",
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 18),
        provider_id: "123",
        user_id: "user",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
