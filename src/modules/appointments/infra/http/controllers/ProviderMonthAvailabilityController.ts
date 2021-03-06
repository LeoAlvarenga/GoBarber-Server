import { Request, Response } from "express";
import { container } from "tsyringe";
import ListProviderMonthAvailabilityService from "@modules/appointments/services/ListProviderMonthAvailabilityService";

export default class ProviderMonthAvailabilityController {
  public async index(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { provider_id } = request.params
    const { month, year } = request.body

    const providerMonthAvailabilityService = container.resolve(
      ListProviderMonthAvailabilityService
    );

    const availability = await providerMonthAvailabilityService.execute({
      month,
      year,
      provider_id
    });

    return response.json(availability);
  }
}
