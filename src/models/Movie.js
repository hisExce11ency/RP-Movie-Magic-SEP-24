import { model, Schema, Types } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        require: true,
        minLength: 5,
        validate: [/^[A-Za-z0-9 ]+$/, 'Title can contain only alphanumeric characters!'],
    },
    genre: {
        type: String,
        require: true,
        minLength: 5,
        validate: [/^[A-Za-z0-9 ]+$/, 'Genre can contain only alphanumeric characters!'],
    },
    director: {
        type: String,
        require: true,
        minLength: 5,
        validate: [/^[A-Za-z0-9 ]+$/, 'Director can contain only alphanumeric characters!'],
    },
    year: {
        type: Number,
        require: true,
        min: [1900, 'Can not add movies older then 1900 year!'],
        max: [2024, 'Can not add movies older then 2024!'],
    },
    rating: {
        type: Number,
        require: true,
        min: [1, 'Rating should be at least 1!'],
        max: [5, 'Rating can not be higher than 5!'],
    },
    description: {
        type: String,
        require: true,
        validation: [/^[A-Za-z0-9 ]+$/, 'Description can contai nonly alphanumeric characters!'],
        minLength: [20, 'Description should be at least 20 characcters!'],
    },
    imageUrl: {
        type: String,
        require: true,
        validate: [/^https?:\/\//, 'Invalid image url!'],
    },
    casts: [{
        character: String,
        cast: {
            type: Types.ObjectId,
            ref: 'Cast',
        },
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User',
    }
});

const Movie = model("Movie", movieSchema);

export default Movie;