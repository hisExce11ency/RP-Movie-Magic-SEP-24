import bcrypt from "bcrypt"
import jwt from "../lib/jwt.js"

import User from "../models/User.js";

const register = async (email, password) => {
    //TODO: check if user exists
    const userCount = await User.countDocuments({ email });

    if (userCount > 0) {
        throw new Error('User already exists!');
    }

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
    const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });

    //TODO: return jwt token
    return token;

};


export default {
    register,
    login,
}
