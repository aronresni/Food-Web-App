const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    sequelize.define(
        "diets", {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
    )
}