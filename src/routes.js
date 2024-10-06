import { Router } from 'express';

import homeController from './controllers/homeController.js'
import movieControler from './controllers/movieController.js'
import castControler from './controllers/castController.js'
import authControler from './controllers/authController.js'

const router = Router();

router.use(homeController);
router.use('/movies', movieControler);
router.use('/casts', castControler);
router.use('/auth', authControler);

router.all('*', (req, res) => {
    res.render('404');
});

export default router;