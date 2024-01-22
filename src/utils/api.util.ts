import { NextFunction, Response } from 'express';
import createHttpError from 'http-errors';
import { z } from 'zod';

export type QueryParamsType = {
  search?: object;
  filters?: object;
  sortField?: string;
  sortOrder?: string;
  skip?: number;
  pageSize?: number;
};

export const queryParams = async (req: any, res: Response, next: NextFunction) => {
  try {
    const validate = z
      .object({
        currentPage: z.string().nullable().default('0').optional(),
        pageSize: z.string().nullable().default('10').optional(),
        sortOrder: z.enum(['asc', 'desc']).default('asc').optional(),
        sortField: z.string().optional(),
        filters: z.any().nullable().optional(),
        search: z.any().nullable().optional(),
      })
      .passthrough()
      .safeParse(req.query);

    if (!validate.success) {
      return next(createHttpError(400, { message: validate.error.issues }));
    }

    const {
      currentPage = 1,
      pageSize = 10,
      sortOrder,
      sortField,
      search = {},
      filters,
    } = req.query;

    if (req.query?.currentPage) {
      if (currentPage <= 0) {
        return next(createHttpError(400, { message: 'currentPage must start from 1' }));
      }
    }

    const skip = (currentPage - 1) * pageSize;

    req.query = {
      skip,
      pageSize: +pageSize,
      sortOrder,
      sortField,
      search,
      filters,
    };

    return next();
  } catch (err) {
    return next(err);
  }
};
