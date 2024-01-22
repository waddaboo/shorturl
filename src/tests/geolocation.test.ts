import { equal } from 'assert';
import request from 'supertest';
import { getGeolocationByUrlId, getGeolocationFromIp } from '../services/geolocation.service';
import { deleteShortUrlById } from '../services/url.service';

const app = require('../index');

const url = '/shorturl/api/v1.0';

describe('GEOLOCATION TEST', () => {
  describe('util test', () => {
    describe('getGeolocationFromIp test', () => {
      it('should return ip details', async () => {
        const ipdata = await getGeolocationFromIp('19.192.108.220');
        equal(ipdata.latitude, 42.3344);
        equal(ipdata.longitude, -83.1756);
      });
    });
  });

  describe('service test', () => {
    describe('create geolocation on redirect', () => {
      let shortUrlId: string;
      it('should create geolocation', async () => {
        const response = await request(app)
          .post(`${url}/url/shorten`)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .send({ targetUrl: 'https://www.google.com/' })
          .expect(201);

        shortUrlId = response.body.id;

        await request(app)
          .get(`${url}/url/redirect/${response.body.shortUrl}`)
          .set('Content-Type', 'application/json');

        const geolocation = await getGeolocationByUrlId(response.body.id);
        equal(geolocation?.urlId, response.body.id);
      }).timeout(30000);

      it('geolocation test cleanup', async () => {
        await deleteShortUrlById(shortUrlId);
      });
    });
  });
});
