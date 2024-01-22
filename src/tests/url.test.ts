import { equal } from 'assert';
import request from 'supertest';
import { generateNanoId, httpReplace, isExistUrl, urlTitle } from '../utils/url.util';
import { getShortUrlByShortUrl } from '../services/url.service';

const app = require('../index');

const url = '/shorturl/api/v1.0';

describe('URL TEST', () => {
  describe('util test', () => {
    describe('generateNanoId test', () => {
      it('should return nanoid with 10 length string', () => {
        const nanoid = generateNanoId();
        equal(nanoid.length, 10);
      });
    });

    describe('isExistUrl test', () => {
      it('should return true if url exist', async () => {
        const isExist = await isExistUrl('https://www.google.com/');
        equal(isExist, true);
      });
      // this test will take longer due to accessing website that does not exist
      it('should return false if url does not exist', async () => {
        const isExist = await isExistUrl('https://asd.com/');
        equal(isExist, false);
      }).timeout(30000);
    });

    describe('httpReplace test', () => {
      it('should add http:// for url without http://', () => {
        const http = httpReplace('www.google.com');
        equal(http, 'http://www.google.com');
      });
    });

    describe('urlTitle test', () => {
      it('should return url title', async () => {
        const title = await urlTitle('https://www.google.com/');
        equal(title, 'Google');
      });
    });
  });

  let testUrlId: string;
  let shortUrl: string;
  describe('api test', () => {
    describe('GET /url/report', () => {
      it('should return status 200', () => {
        request(app).get(`${url}/url/report`).set('Accept', 'application/json').expect(200);
      });
    });

    describe('POST /url/shorten', () => {
      it('shorten successful, should return status 201', async () => {
        const response = await request(app)
          .post(`${url}/url/shorten`)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .send({ targetUrl: 'https://www.google.com/' })
          .expect(201);
        equal(response.body.targetUrl, 'https://www.google.com/');
        testUrlId = response.body.id;
        shortUrl = response.body.shortUrl;
      });

      it('invalid target url, should return status 400', async () => {
        await request(app)
          .post(`${url}/url/shorten`)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .send({ targetUrl: 'fakeurl' })
          .expect(400);
      }).timeout(30000);
    });

    describe('GET /url/redirect/:shortUrl', () => {
      it('should redirect successfully', async () => {
        const response = await request(app)
          .get(`${url}/url/redirect/${shortUrl}`)
          .set('Content-Type', 'application/json')
          .expect(200);
        equal(response.body, 'https://www.google.com/');
      });
      it('click count should +1', async () => {
        const response = await getShortUrlByShortUrl(shortUrl);
        equal(response?.clicks, 1);
      });
    });

    describe('DELETE /url/delete/:id', () => {
      it('should delete short url record', async () => {
        await request(app)
          .delete(`${url}/url/delete/${testUrlId}`)
          .set('Content-Type', 'application/json')
          .expect(204);
      });
    });
  });
});
