import express from "express";
import cookieParser from "cookie-parser";
import { authMiddleware } from "../middleware/authMiddleware.js";

export default function expressInit(app) {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(cookieParser());
    app.use(authMiddleware);
};