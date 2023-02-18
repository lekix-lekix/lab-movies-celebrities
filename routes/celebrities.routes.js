// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// Routes prefixed with "/celebrities"
router.get("/create", (req, res, next) => {
    try {
        res.render("celebrities/new-celebrity");
    } catch (error) {
        next(error);
    }
})

router.post("/create", (req, res) => {
    try {
        const {name, occupation, catchPhrase} = req.body;
        const newCeleb = Celebrity.create(req.body);
        res.redirect("/celebrities");
    } catch (error) {
        res.render("celebrities/new-celebrity");
    }
})

router.get("/", async (req, res, next) => {
    try {
        const allCeleb = await Celebrity.find();
        res.render("celebrities/celebrities", { allCeleb });
    } catch (error) {
        next(error)
    }
})
module.exports = router;