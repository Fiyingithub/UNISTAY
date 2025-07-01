import { DataTypes, UUIDV4 } from "sequelize";
import { ROLES } from "../constants/role.constant.js";
import { sequelize } from "../config/db.config.js";


const User = sequelize.define('User',{

    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    fullname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM(ROLES.ADMIN, ROLES.LANDLORD, ROLES.STUDENT),
        allowNull: false
    },
    businessName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    businessDocumentUploadString: {
        type: DataTypes.STRING,
        allowNull: true
    },
    university: {
        type: DataTypes.STRING,
        allowNull: true
    },
    matricNumber: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true
})


export default User