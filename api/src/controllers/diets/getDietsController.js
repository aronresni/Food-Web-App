const axios = require('axios');
const { Diets } = require('../../db');
const { API_KEY } = process.env;

const getDiets = async () => {
    try {
        const dietsFromDb = await Diets.findAll();
        
        if (dietsFromDb.length === 0) {
            const dietApi = await axios.get(
                `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=5&addRecipeInformation=true`
            );
            const dietNames = dietApi.data.results.map((el) => el.diets).flat();
            const uniqueDietNames = [...new Set(dietNames)];

            const createdDiets = await Promise.all(uniqueDietNames.map(async (name) => {
                return await Diets.create({ name });
            }));

            return createdDiets;
        } else {
            return dietsFromDb;
        }
    } catch (error) {
        console.error('Error al obtener las dietas:', error.message);
        throw new Error('Error al obtener las dietas');
    }
};

module.exports = {
    getDiets
};
