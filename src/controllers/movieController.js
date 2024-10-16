import { Router } from "express";

import movieService from "../services/movieService.js";
import castService from "../services/castService.js";
import { isAuth } from "../middleware/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const router = Router();

//URL: /movies/create
router.get('/create', isAuth, (req, res) => {
    res.render('movies/create');
});

router.post('/create', isAuth, async (req, res) => {
    const movieData = req.body;
    const ownerId = req.user?._id;

    try {
        await movieService.create(movieData, ownerId);
    } catch (err) {
        // Challenge: Show multi errors
        const errorMessage = getErrorMessage(err);
        //console.dir(Object.values(err.errors)[0]?.message);
        //return res.end();
        return res.render('movies/create', { error: errorMessage, moive: movieData });
    }

    res.redirect('/');
});

router.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieService.getAll(filter).lean();

    res.render('home', { isSearch: true, movies, filter });
});

router.get('/:movieId/details', async (req, res) => {

    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();

    const isOwner = movie.owner && req.user?._id == movie.owner;

    res.render('movies/details', { movie, isOwner });
});

router.get('/:movieId/attach', isAuth, async (req, res) => {
    const movie = await movieService.getOne(req.params.movieId).lean();
    const casts = await castService.getAllExlude(movie.casts).lean();

    res.render("movies/attach", { movie, casts });
});

router.post('/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;
    const character = req.body.character;

    await movieService.attach(movieId, castId, character);

    res.redirect(`/movies/${movieId}/details`);
});

router.get('/:movieId/delete', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    // Chck if owner
    const movie = await movieService.getOne(movieId).lean();

    if (movie.owner != req.user?._id) {
        // return res.render('movies/details', { movie, isOwner: false, error: ' Unauthorised to delete this movie!' });
        res.setError('Unauthorised to delete this movie!');
        return res.redirect('/404');
    };

    await movieService.remove(movieId);

    res.redirect('/');
});

router.get('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();

    res.render('movies/edit', { movie });
});

router.post('/:movieId/edit', isAuth, async (req, res) => {
    const movieData = req.body;

    const movieId = req.params.movieId;

    await movieService.edit(movieId, movieData);

    res.redirect(`/movies/${movieId}/details`);
})

export default router;