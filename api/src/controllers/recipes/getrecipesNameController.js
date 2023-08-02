const Recipe = require("../../models/Recipe");
const axios = require("axios");
const { API_KEY, URL_BASE } = process.env;
require("dotenv").config();

const getRecipeName = async (req, res) => {
    try {
        const { name } = req.params;
        const recipeDb = await Recipe.findByPk(name);
        if (recipeDb) {
            return res.status(200).json(recipeDb)
        }
        
    }
    catch (error) {

    }

}
module.exports = {
    getRecipeName
}