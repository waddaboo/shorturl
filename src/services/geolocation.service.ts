import { PrismaClient } from '@prisma/client';
import { GeolocationType } from '../models/schema/geolocation.schema';

const prisma = new PrismaClient();

export const getGeolocationFromIp = async (ip: string) => {
  const fetchResult = await fetch(`https://ipapi.co/${ip}/json/`);
  const fetchData = await fetchResult.json();

  return fetchData;
};

export const getGeolocationByUrlId = async (urlId: string) => {
  const geolocation = await prisma.geolocation.findFirst({
    where: {
      urlId,
    },
  });

  return geolocation;
};

export const createGeolocation = async (urlId: string, data: GeolocationType) => {
  const geolocation = await prisma.geolocation.create({
    data: {
      urlId,
      ...data,
    },
  });

  return geolocation;
};
