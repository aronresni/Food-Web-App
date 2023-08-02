const Recipe = require("../../models/Recipe");
const axios = require("axios");
const { fdatasync } = require("fs");
const { API_KEY, URL_BASE } = process.env;
require("dotenv").config();


//es async por que va a trabajar con los models, y estos manejan/retornar promesas 
//esto recibe lo que necesita
const getRecipeId = async (req, res) => {
    try {
        const { id } = req.params;
        //recipeDb busca en la base de datos local utilizando sequalize (Reccipe.findByPk)
        const recipeDb = await Recipe.findByPk(id);

        //devuelve la receta encontrada en la BD
        if (recipeDb) {
            return res.status(200).json(recipeDb)
        }
        const { data } = await axios.get(`${URL_BASE}${id}/information?apiKey=${API_KEY}`);
        const recipe = {
            id: data.id,
            name: data.tittle,
            image: data.image,
            summary: data.summary,
            healthScore: data.healthScore,
            steps: data.analyzedInstructions[0] ? data.analyzedInstructions[0].steps.map((step) => step.step) : [],
            diets: data.diets,
        };
        const newRecipe = await Recipe.create(recipe);
        res.status(200).json(newRecipe);
    } catch (error) {
        // Manejo de errores
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

module.exports = {
    getRecipeId
}