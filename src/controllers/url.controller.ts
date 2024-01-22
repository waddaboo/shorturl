import { NextFunction, Request, Response } from 'express';
import {
  countAllShortUrl,
  createShortUrl,
  deleteShortUrlById,
  getAllShortUrl,
  getShortUrlByShortUrl,
  updateShortUrlClicksById,
  urlParamValidator,
} from '../services/url.service';
import { errorMessage } from '../utils/errorHandler.util';
import { generateNanoId, httpReplace, isExistUrl, urlTitle } from '../utils/url.util';
import { createGeolocation, getGeolocationFromIp } from '../services/geolocation.service';

export const getAllShortUrlController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getAllShortUrl(req.query);
    const total = await countAllShortUrl();

    return res.status(200).json({ data, total });
  } catch (err) {
    return next(err);
  }
};

export const postNewShortUrlController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    if (body.targetUrl) {
      body.targetUrl = httpReplace(body.targetUrl);
    }

    const validation = urlParamValidator(body);
    if (!validation.success) {
      return next(errorMessage(validation.error.issues));
    }

    const isExist = await isExistUrl(body.targetUrl);
    if (!isExist) {
      return res.status(400).json({ statusCode: 400, message: 'Invalid target URL' });
    }

    body.title = await urlTitle(body.targetUrl);
    body.shortUrl = generateNanoId();
    body.targetUrl = body.targetUrl.trim();

    const shortUrl = await createShortUrl(body);

    return res.status(201).json(shortUrl);
  } catch (err) {
    return next(err);
  }
};

export const redirectShortUrlController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ip } = req;
    const { shortUrl } = req.params;

    const url = await getShortUrlByShortUrl(shortUrl);

    if (!url) {
      return res.status(404).json({ message: 'Invalid short URL' });
    }

    await updateShortUrlClicksById(url.id);

    if (ip) {
      const ipGeo = await getGeolocationFromIp(ip);

      if (ipGeo) {
        await createGeolocation(url.id, {
          ip,
          country: ipGeo.country,
          country_name: ipGeo.country_name,
          city: ipGeo.city,
          region: ipGeo.region,
          postal: ipGeo.postal,
          latitude: ipGeo.latitude,
          longitude: ipGeo.longitude,
          timezone: ipGeo.timezone,
        });
      }
    }

    return res.status(200).json(url.targetUrl);
  } catch (err) {
    return next(err);
  }
};

export const deleteShortUrlByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await deleteShortUrlById(id);

    return res.sendStatus(204);
  } catch (err) {
    return next(err);
  }
};
