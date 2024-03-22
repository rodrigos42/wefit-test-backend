import { DataTypes, Sequelize } from "sequelize"
import dbConnection from "../../db"
import AddressSequelize from "./AddressSequelize"

const userAttrib = {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cellphone: {  
        type: DataTypes.STRING,
        allowNull: false
    },
    telephone: {  
        type: DataTypes.STRING,
        allowNull: false
    },
    legalPerson: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    termsAgreementAccepted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}

const UserSequelize = dbConnection.define('user', userAttrib)

AddressSequelize.hasMany(UserSequelize)

UserSequelize.sync({force: false}).then(() => {
    console.log(`'UserSequelize' is sync`);
})

export = UserSequelize