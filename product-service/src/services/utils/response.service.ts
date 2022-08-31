import { Response } from 'express';

import { HTTPStatuses } from '../../constants';


export class ResponseService {
  createBadResponce(res: Response, message: string): Response {
    return this.createResponce(res, message, HTTPStatuses.NOT_FOUND);
  }

  public createResponce(
    res: Response,
    body: any,
    statusCode: number = HTTPStatuses.SUCCESS
  ): Response {
    return res
      .status(statusCode)
      .json(body);
  }
}
