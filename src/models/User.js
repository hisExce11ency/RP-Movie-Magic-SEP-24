import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true, //Index
        minLength: [10, 'Email must be at least 10 characters long!'],
    },
    password: {
        type: String,
        minLength: [3, 'Your password is too short!']
    }
});

//Hash password before safe
userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);

    this.password = hash;
});

const User = model('User', userSchema);

export default User;