import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      (file.slice(-3) === '.ts' || file.slice(-3) === '.js')
  )
  .forEach((file) => {
    router.use(require(path.join(__dirname, file)).default);
  });

export default router;
