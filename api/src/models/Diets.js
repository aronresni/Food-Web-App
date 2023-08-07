const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    sequelize.define(
        "diets", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        steps: {
            type: DataTypes.TEXT,  // O el tipo de dato apropiado
            allowNull: true,  // Permitir valores nulos si es necesario
        },
        
    }
    )
}