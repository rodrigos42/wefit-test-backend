import { DataTypes } from "sequelize"
import dbConnection from "../../db"

const addressAttrib = {
    zipCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    complement: {
        type: DataTypes.STRING,
        allowNull: true
    },
    neighborhood: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    }
}

const AddressSequelize = dbConnection.define('address', addressAttrib)

AddressSequelize.sync({ force: false}).then(() => {
    console.log(`'AddressSequelize' is sync`);
})

export = AddressSequelize

