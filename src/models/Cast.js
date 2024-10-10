import { Schema, model } from "mongoose";

const castSchema = new Schema({
    name: {
        type: String,
        required: true,
        validation: [/^[A-Za-z0-9 ]+$/, 'Name can contain nonly alphanumeric characters!'],
        minLength: [5, 'Name should be at least 5 characters!'],
    },
    age: {
        type: Number,
        min: 1,
        max: 120,
    },
    born: {
        type: String,
        minLength: [10, 'Born should be at least 10 characters!'],
        validation: [/^[A-Za-z0-9 ]+$/, 'Name can contain nonly alphanumeric characters!'],
    },
    imageUrl: {
        type: String,
        require: true,
        validate: [/^https?:\/\//, 'Invalid image url!'],
    },
});

const Cast = model("Cast", castSchema);

export default Cast;