import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    // TODO: Ceck if there is a token in the request
    const token = req.cookies["auth"];

    if (!token) {
        return next();
    }
    // TODO: Validate token
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // TODO: Add user data to request
        const user = {
            _id: decodedToken._id,
            email: decodedToken.email
        };

        res.user = user;
        res.locals.userId = user._id;
        res.locals.userEmail = user.email;
        res.locals.isAuthenticated = true;

        return next();

    } catch (err) {
        //TODO: Invalid token
        res.clearCookie('auth');

        res.redirect('/auth/login');
    }
};