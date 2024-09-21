import { Router } from 'express';

import homeController from './controllers/homeController.js'

import movieControler from './controllers/movieControler.js'

const router = Router();

router.use(homeController);
router.use('/movies', movieControler);

export default router;