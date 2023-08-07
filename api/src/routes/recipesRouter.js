const { Router } = require("express");
const recipeService = require("../services/recipeService");

const router = Router();

router.get("/getAll", async (req, res) => {
    try {
        const recipes = await recipeService.getRecipeName(req);
        res.status(200).json(recipes);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;