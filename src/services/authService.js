import bcrypt from "bcrypt"
import User from "../models/User.js";
import jwt from "jsonwebtoken"

const SECRET = "asd48hbxshd8y363mndg782ud3dfgsdg"

const register = (email, password) => {
    //TODO: check if user exists

    return User.create({ email, password });
};

const login = async (email, password) => {
    //TODO: check if user exist
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('User does not exist!');
    };
    //TODO: validate pssword
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Password does not match!')
    }

    //TODO: generate jwt token
    const payload = {
        _id: user._id,
        email,
    }
    const token = jwt.sign(payload, SECRET, { expiresIn: '4h' });

    //TODO: return jwt token
    return token

};


export default {
    register,
    login,
}
