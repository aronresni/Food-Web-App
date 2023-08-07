const getDietsController = require("../controllers/diets/getDietsController")

const getDietService = async (req, res) => {
    try {
        const diets = await getDietsController.getDiets();
        res.status(200).json(diets);
    } catch (error) {
        console.error('Error al obtener las dietas:', error.message);
        res.status(500).send('Error al obtener las dietas');
    }
};

module.exports = {
    getDietService
};