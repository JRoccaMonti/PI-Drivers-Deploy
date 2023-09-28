const axios = require('axios');
const { conn } = require('../db'); // Importa la instancia de Sequelize

const getLastApiDriverId = async () => {
    try {
        const response = await axios.get('http://localhost:5000/drivers'); // Peticion GET a la API
        const list = response.data; // Guarda los datos
        if (list.length > 0) {
            // Obtiene la última ID de la API
            const lastDriver = list[list.length - 1];
            return lastDriver.id;
        }
        return null; // Retorna null si no hay datos en la API
    } catch (error) {
        throw error;
    }
};

const configureDatabaseIdStartValue = async () => {
    try {
        const lastApiDriverId = await getLastApiDriverId();
        if (lastApiDriverId !== null) {
            // Configura el valor inicial de la secuencia de autoincremento
            await conn.query(`ALTER SEQUENCE "Drivers_id_seq" RESTART WITH ${lastApiDriverId + 1}`);
        }
    } catch (error) {
        throw error;
    }
};

module.exports = { configureDatabaseIdStartValue };

