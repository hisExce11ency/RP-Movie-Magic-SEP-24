import { model, Schema, Types } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    genre: {
        type: String,
        require: true,
    },
    director: {
        type: String,
        require: true,
    },
    year: {
        type: Number,
        require: true,
        min: 1900,
        max: 2050,
    },
    rating: {
        type: Number,
        require: true,
        min: 1,
        max: 10,
    },
    description: {
        type: String,
        require: true,
        maxLength: 500,
    },
    imageUrl: {
        type: String,
        require: true,
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