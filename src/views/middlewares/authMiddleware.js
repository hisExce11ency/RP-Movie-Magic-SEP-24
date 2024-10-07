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

        console.log(decodedToken);
        // TODO: Add user data to request
        return next();

    } catch (err) {
        //TODO: Invalid token
    }

}