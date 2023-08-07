const { Router } = require("express");
const recipeService = require("../services/recipeService");
const model = require("../controllers/recipes/recipeController")

const router = Router();
router.get('/getAll', async (req, res) => {
    try {
        const recipes = await recipeService.getRecipesFromDatabaseOrApi();
        res.status(200).json(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get("/:name", async (req, res) => {
    try {
        const { name } = req.params; // Extraer el parámetro 'name' de req.query
        const recipes = await recipeService.getRecipeName(name); // Pasar 'name' como argumento
        res.status(200).json(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const recipes = await recipeService.getRecipeId(id);
        if (recipes.length > 0) {
            res.status(200).json(recipes);
        } else {
            res.status(404).send('No se Encontró Receta con el id: ' + id);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/', async (req, res) => {
    const { name, summary, healthScore, image, createIndb, diet } = req.body;

    if (!name || !summary) {
        res.status(400).send('Los campos name y summary son requeridos');
    } else {
        try {
            const result = await recipeService.createRecipe(
                name,
                summary,
                healthScore,
             
                image,
                createIndb,
                diet
            );
            res.send(result);
        } catch (error) {
            res.status(500).send('Error al crear la receta');
        }
    }
});




module.exports = router;
