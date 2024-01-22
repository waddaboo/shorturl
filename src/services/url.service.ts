import { PrismaClient } from '@prisma/client';
import { UrlType, urlSchema } from '../models/schema/url.schema';
import { QueryParamsType } from '../utils/api.util';
import { createFilter, createSearch } from '../utils/db.util';

const prisma = new PrismaClient();

export const urlParamValidator = (body: any) => {
  const validator = urlSchema.passthrough().safeParse(body);

  return validator;
};

export const getAllShortUrl = async (query: QueryParamsType) => {
  const url = await prisma.url.findMany({
    where: {
      ...createSearch(query?.search),
      ...createFilter(query?.filters),
    },
    orderBy: {
      [`${query?.sortField || 'createdAt'}`]: query?.sortOrder || 'desc',
    },
    skip: Number(query?.skip) || 0,
    take: Number(query?.pageSize) || 10,
    include: {
      Geolocation: true,
    },
  });

  return url;
};

export const countAllShortUrl = async () => {
  const url = await prisma.url.count();

  return url;
};

export const getShortUrlByShortUrl = async (shortUrl: string) => {
  const url = await prisma.url.findFirst({
    where: {
      shortUrl,
    },
  });

  return url;
};

export const createShortUrl = async (body: UrlType) => {
  const shortenUrl = await prisma.url.create({
    data: body,
  });

  return shortenUrl;
};

export const updateShortUrlClicksById = async (id: string) => {
  const shortUrl = await prisma.url.update({
    where: {
      id,
    },
    data: {
      clicks: {
        increment: 1,
      },
    },
  });

  return shortUrl;
};

export const deleteShortUrlById = async (id: string) => {
  const shortUrl = await prisma.url.delete({
    where: {
      id,
    },
  });

  return shortUrl;
};
