import { ErrorStatusCode } from '../types';
import { Request, Response, NextFunction } from 'express';
import {
  ValidationError,
  UniqueConstraintError,
  DatabaseError,
} from 'sequelize';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err?.sql) {
    res
      .status(ErrorStatusCode.BAD_REQUEST)
      .send({ message: err.message, source: 'sql' });
  }

  res.status(err.status || ErrorStatusCode.INTERNAL_SERVER_ERROR).send({
    message: err.message || 'Internal Server Error',
  });
}
