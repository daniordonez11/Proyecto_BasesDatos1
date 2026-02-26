const {Sequelize, DataTypes, Model} = require('sequelize');

const sequelize = new Sequelize('test', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

class Usuario extends Model {}

Usuario.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    timestamps: false
})

module.exports = Usuario;

async function testConnection() {
    try {
  await sequelize.authenticate();
  console.log('Conexion a DB exitosa.');
} catch (error) {
  console.error('ERROR A CONEXION DB: ', error);
}
}

testConnection();