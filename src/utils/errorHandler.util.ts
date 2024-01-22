import { NextFunction, Request, Response } from 'express';
import { ZodIssue } from 'zod';
import { generateErrorMessage } from 'zod-error';
import createHttpError from 'http-errors';

export const errorMessage = (err: ZodIssue[]) => {
  const errMessage = generateErrorMessage(err);

  return createHttpError(400, { message: errMessage });
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 400;

  return res.status(status).json({ statusCode: status, ...err });
};
