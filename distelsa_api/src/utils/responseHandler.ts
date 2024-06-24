import { Response, Request } from 'express';
import { ResponseTypes, ResponseTypes_STATUS_CODE } from './responseTypes';
import { ApiResponse } from './responseTypes';
import { logToDatabase } from './logger';

export const sendResponse = (req: Request, res: Response, typeRes: keyof typeof ResponseTypes, response: ApiResponse): void => {
  const statusCode = ResponseTypes_STATUS_CODE[typeRes];
  try {
    if ([200, 201].includes(statusCode)) {
      //logs
      logToDatabase({ type: 'event', path: `${req.method}; ${req.baseUrl}; ${req.path}`, params: JSON.stringify(req.body), statusCode: statusCode, message: response.message });
    } else {
      //logs
      logToDatabase({ type: 'error', path: `${req.method}; ${req.baseUrl}; ${req.path}`, params: JSON.stringify(req.body), statusCode: statusCode, message: response.error });
    }
  } catch (error) {
    console.log(error)
  }
  res.status(statusCode).json(response);
};
