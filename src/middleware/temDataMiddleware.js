export const tempData = (req, res, next) => {
    // Error that will presist after two http request cycles
    res.setError = (message) => {
        req.session.error = {
            message,
            reqCount: 0,
        };
    }
    if (req.session.error) {
        if (req.session.error.reqCount > 0) {
            req.session.error = null;
        } else {
            req.session.error.reqCount++;
            res.locals.error = req.session.error.message;
        }
    }
    next();
};