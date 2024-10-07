import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import User from "../models/User.js";

const register = (email, password) => {
    //TODO: check if user exists

    return User.create({ email, password });
};

const login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('User does not exist!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Password does not match!')
    }

    //TODO: generate jwt token
    const payload = {
        _id: user._id,
        email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });

    //TODO: return jwt token
    return token;

};


export default {
    register,
    login,
}
