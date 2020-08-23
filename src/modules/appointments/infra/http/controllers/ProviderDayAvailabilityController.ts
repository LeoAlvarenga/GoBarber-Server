import { Request, Response } from "express";
import { container } from "tsyringe";
import ListProviderDayAvailabilityService from "@modules/appointments/services/ListProviderDayAvailabilityService";

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year, day } = request.body;

    const providerDayAvailabilityService = container.resolve(
      ListProviderDayAvailabilityService
    );

    const availability = await providerDayAvailabilityService.execute({
      month,
      year,
      provider_id,
      day,
    });

    return response.json(availability);
  }
}
