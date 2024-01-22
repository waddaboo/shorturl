import { Router } from 'express';

const router = Router();

router.use('/shorturl/api/v1.0', require('./api/v1.0').default);

export default router;
