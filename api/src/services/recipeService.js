const { Recipe, Diets } = require('../db');
const model = require("../controllers/recipes/recipeController");
const { recipes } = require("../controllers/diets/getDietsController")
const { API_KEY, URL_BASE } = process.env
const axios = require("axios");




async function getRecipesFromDatabaseOrApi() {
    try {
        const recipeTotal = await model.getRecipeDb();
        
        if (recipeTotal.length > 0) {
            return recipeTotal;
        } else {
            const apiResponse = await axios.get(
                `${URL_BASE}/complexSearch?number=100&apiKey=${API_KEY}&addRecipeInformation=true`
            );
            return apiResponse.data.results;
        }
    } catch (error) {
        console.error('Error fetching recipes:', error.message);
        return [];
    }
}



async function getRecipeName(name) {
    let recipesFromDb = await model.getRecipeDb();
    let recipesFromApi = [];

    if (name) {
        recipesFromDb = recipesFromDb.filter((element) =>
            element.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    if (recipesFromDb.length < 1 || !name) {
        try {
            const apiResponse = await axios.get(
                `${URL_BASE}/complexSearch?titleMatch=${name}&apiKey=${API_KEY}&addRecipeInformation=true`
            );
            recipesFromApi = apiResponse.data.results;
        } catch (error) {
            console.error('Error fetching recipes from API:', error.message);
        }
    }

    return [...recipesFromDb, ...recipesFromApi];
}

async function getRecipeId(id) {
    let recipesFromDb = await model.getRecipeDb();
    let recipesFromApi = [];

    recipesFromDb = recipesFromDb.filter((el) => el.id == id);

    if (recipesFromDb.length < 1) {
        try {
            const apiResponse = await axios.get(
                `${URL_BASE}/${id}/information?apiKey=${API_KEY}`
            );
            recipesFromApi.push(apiResponse.data);
        } catch (error) {
            console.error('Error fetching recipe from API:', error.message);
        }
    }

    return [...recipesFromDb, ...recipesFromApi];
}

async function createRecipe(name, summary, healthScore, stepbyStep, image, createIndb, diet) {
    try {
        const recipeCreated = await Recipe.create({
            name,
            summary,
            healthScore,
            stepbyStep,
            image,
            createIndb,
        });

        const dietDb = await Diets.findOne({
            where: {
                name: diet,
            },
        });

        if (dietDb) {
            await recipeCreated.addDiet(dietDb);
            return 'Receta creada exitosamente';
        } else {
            return 'Dieta no encontrada';
        }
    } catch (error) {
        console.error('Error al crear la receta:', error.message);
        throw new Error('Error al crear la receta');
    }
}



module.exports = {
    getRecipeName,
    getRecipeId,
    getRecipesFromDatabaseOrApi,
    createRecipe
};

