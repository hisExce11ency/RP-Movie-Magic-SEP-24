import { Router } from 'express';

import homeController from './controllers/homeController.js'

import movieControler from './controllers/movieControler.js'

import castControler from './controllers/castControler.js'

const router = Router();

router.use(homeController);
router.use('/movies', movieControler);
router.use('/casts', castControler);
router.all('*', (req, res) => {
    res.render('404');
});

export default router;