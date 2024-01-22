import { Router } from 'express';
import {
  deleteShortUrlByIdController,
  getAllShortUrlController,
  postNewShortUrlController,
  redirectShortUrlController,
} from '../../../controllers/url.controller';
import { queryParams } from '../../../utils/api.util';

const router = Router();

router.post('/url/shorten', postNewShortUrlController);
router.get('/url/redirect/:shortUrl', redirectShortUrlController);
router.get('/url/report', queryParams, getAllShortUrlController);
router.delete('/url/delete/:id', deleteShortUrlByIdController);

export default router;
