const { Diet } = require("../../db")
const axios = require("axios")
const { API_KEY, API_BASE } = process.env;

const getDietController = async () => {
    const response = await axios.get(`${API_BASE}/complexSearch?apiKey=${API_KEY}`);
    if (response.status === 200) {
        const dietsFromApi = response.data;
        await Diet.bulkCreate(dietsFromApi);

    } else { console.log(error); }
}

module.exports = {
    getDietController
};