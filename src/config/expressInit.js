import express from "express";
import cookieParser from "cookie-parser";
import { authMiddleware } from "../middleware/authMiddleware.js";
import session from "express-session";
import { tempData } from "../middleware/temDataMiddleware.js";

export default function expressInit(app) {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static('public'));
    app.use(cookieParser());
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }));
    app.use(authMiddleware);
    app.use(tempData);
};