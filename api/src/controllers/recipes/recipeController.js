const axios = require("axios");
const { URL_BASE, API_KEY } = process.env;
const { Recipe, Diets } = require('../../db');


const getRecipeApi = async () => {
    const cantidadRecetas = await Recipe.count();

    if (cantidadRecetas < 100) {
        try {

            const respuestaAPI = await axios.get(`${URL_BASE}/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
            const recetasAPI = respuestaAPI.data.results;

            for (const recetaAPI of recetasAPI) {
                const pasosReceta = recetaAPI.analyzedInstructions[0]?.steps.map(paso => `<b>${paso.number}</b> ${paso.step}`);

                const nuevaReceta = await Recipe.create({
                    name: recetaAPI.title,
                    summary: recetaAPI.summary,
                    healthScore: recetaAPI.healthScore,
                    stepbyStep: pasosReceta.join('  '),
                    image: recetaAPI.image,
                });

                // Buscar y asociar dietas
                const dietas = await Diets.findAll({
                    where: { name: recetaAPI.diets },
                });
                nuevaReceta.addDiet(dietas);
            }

            console.log('Recetas cargadas exitosamente');
        } catch (error) {
            console.error('Error al obtener o cargar las recetas:', error.message);
        }
    } else {
        console.log('Las recetas ya están cargadas en la base de datos');
    }
};


const getRecipeDb = async () => {
    return await Recipe.findAll({
        include: [
            {
                model: Diets,
                attributes: ['name'],
            },
        ],
    });
};


module.exports = {
    getRecipeApi,
    getRecipeDb
}