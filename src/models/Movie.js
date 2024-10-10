import { model, Schema, Types } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        require: true,
        minLength: [5, 'Title should be at least 5 characters!'],
        validate: [/^[A-Za-z0-9 ]+$/, 'Title can contain only alphanumeric characters!'],
    },
    genre: {
        type: String,
        require: true,
        minLength: [5, 'Genre should be at least 5 characters!'],
        validate: [/^[A-Za-z0-9 ]+$/, 'Genre can contain only alphanumeric characters!'],
    },
    director: {
        type: String,
        require: true,
        minLength: [5, 'Director\'s name should be at least 5 characters!'],
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
        validate: {
            validator: function (value) {
                if (this.year >= 2000) {
                    return !!value;
                }

                return true;
            },
            message: 'Rating is required for movies after year 2000!'
        },
        min: [1, 'Rating should be at least 1!'],
        max: [5, 'Rating can not be higher than 5!'],
    },
    description: {
        type: String,
        require: true,
        validation: [/^[A-Za-z0-9 ]+$/, 'Description can contain nonly alphanumeric characters!'],
        minLength: [20, 'Description should be at least 20 characcters!'],
    },
    imageUrl: {
        type: String,
        require: true,
        validate: [/^https?:\/\//, 'Invalid image url!'],
    },
    casts: [{
        character: {
            type: String,
            require: true,
            minLength: [5, 'Character should be at least 5 characters!'],
            validate: [/^[A-Za-z0-9 ]+$/, 'Character can contain only alphanumeric characters!'],
        },
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