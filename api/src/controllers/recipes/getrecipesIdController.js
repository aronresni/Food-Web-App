const { Recipe } = require("../../db")
//const data = require("../foodComplexSearch.json");
const { fdatasync } = require("fs");
const axios = require("axios")
const { API_KEY, URL_BASE } = process.env;
require("dotenv").config();

//console.log(data);
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
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
        const data = response.data
        const recipe = {
            id: id,
            name: data.title,
            image: data.image,
            summary: data.summary,
            healthScore: data.healthScore,
            //   steps: data.analyzedInstructions[0] ? data.analyzedInstructions[0].steps.map((step) => step.step) : [],
            //   diets: data.diets,
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