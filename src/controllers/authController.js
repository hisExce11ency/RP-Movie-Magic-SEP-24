import { Router } from "express";
import validator from "validator";

import authService from "../services/authService.js";

const router = Router();

router.get('/register', (req, res) => {
    res.render('auth/register');
});
router.post('/register', async (req, res) => {
    const { email, password, rePassword } = req.body;

    // Validate email format using validator library
    if (!validator.isEmail(email)) {
        return res.status(400).end();
    };
    //TODO: Check if user exists
    try {
        await authService.register(email, password);
    } catch (err) {
        console.log(err.message);
        return res.end()
    }

    // Automatic login for registered users
    const token = await authService.login(email, password);
    res.cookie('auth', token, { httpOnly: true });

    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    //TODO: add token to cookie
    res.cookie('auth', token, { httpOnly: true });

    res.redirect('/');
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');

    //Token invalidation

    res.redirect('/')
});

export default router;