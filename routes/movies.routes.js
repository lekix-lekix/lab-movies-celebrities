const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");
const router = require("express").Router();

// Routes prefixed with "/movies"
router.get("/create", async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find();
        res.render("movies/new-movie", { celebrities });
    } catch (error) {
        next(error);
    }
})

router.post("/create", async (req, res) => {
    try {
        const {title, genre, plot, cast} = req.body;
        const newMovie = Movie.create(req.body);
        res.redirect("/movies");
    } catch (error) {
        res.render("movies/new-movie");
    }
})

router.get("/", async (req, res, next) => {
    try {
        const allMovies = await Movie.find();
        res.render("movies/movies", { allMovies });
    } catch (error) {
        next(error);
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const oneMovie = await Movie.findById(req.params.id).populate("cast");
        res.render("movies/movie-details", { oneMovie })
    } catch (error) {
        next(error);
    }
})

router.post("/:id/delete", async (req, res, next) => {
    try {
        await Movie.findByIdAndRemove(req.params.id);
        res.redirect("/movies");
    } catch (error) {
        next(error);
    }
})

router.get("/:id/edit", async (req, res, next) => {
    try {
        const aMovie = Movie.findById(req.params.id);
        const allCeleb = Celebrity.find();
        res.render("movies/edit-movie", {aMovie}, {allCeleb});
    } catch (error) {
        next(error);
    }
})
module.exports = router;