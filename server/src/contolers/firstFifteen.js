const axios = require('axios');
const { Op } = require('sequelize');
const { Driver, Teams, DriverTeam } = require('../db');

const firstFifteen = async (req, res) => {
    try {
        const { name } = req.query; // Obtén el parámetro de consulta 'name'
        console.log(name);
        // Consulta tanto en la API como en la base de datos
        const apiResponse = await axios.get('http://localhost:5000/drivers');
        const apiDrivers = apiResponse.data;

        const dbDrivers = await Driver.findAll({
            where: {
                [Op.or]: [
                    { 'name': { [Op.iLike]: `%${name}%` } },
                    { 'lastname': { [Op.iLike]: `%${name}%` } },
                ],
            },
            attributes: ['id', 'name', 'lastname', 'description', 'image', 'nationality', 'birthdate'],
        });

        const teams = await Teams.findAll({ attributes: ['id', 'name'],});
        
        const driverTeams = await DriverTeam.findAll({ attributes: ['DriverId', 'TeamId'],});
        
        // Crear un mapa para relacionar las asociaciones entre conductores y equipos
        const driverTeamMap = new Map();
        
        driverTeams.forEach((driverTeam) => {
            const driverId = driverTeam.DriverId;
            const teamId = driverTeam.TeamId;
        
            if (!driverTeamMap.has(driverId)) {
                driverTeamMap.set(driverId, []);
            }
        
            driverTeamMap.get(driverId).push(teamId);
        });
        
        // Asignar los equipos correspondientes a cada conductor
        const driversWithTeams = dbDrivers.map((driver) => {

            const driverId = driver.id;

            const associatedTeamIds = driverTeamMap.get(driverId) || [];
        
            // Buscar los equipos asociados usando los IDs
            const associatedTeams = teams
                .filter((team) => associatedTeamIds.includes(team.id))
                .map((team) => team.name);
        
            // Agregar los equipos al objeto del conductor
            return {
                ...driver.toJSON(),
                teams: associatedTeams.join(', '),
            };
        });

        function filterDrivers(driver) {
            const fullName = `${driver.name.forename} ${driver.name.surname}`.toLowerCase();
            const searchTerm = name.toLowerCase();
            return fullName.includes(searchTerm) || driver.name.forename.toLowerCase().includes(searchTerm) || driver.name.surname.toLowerCase().includes(searchTerm);
        }

        apiDrivers.forEach((driver) => {
            if (!driver.teams) {
                driver.teams = 'Not Found';
            }
        });

        const matchingDrivers = [...apiDrivers.filter(filterDrivers), ...driversWithTeams].slice(0, 15);

        if (matchingDrivers.length === 0) {
            return res.status(404).json({ message: 'No se encontraron conductores.' });
        }

        matchingDrivers.forEach((driver)=>{
            if (driver.image.url == '') {
                driver.image.url = 'http://localhost:3001/images/driversDB/logo.png';
                return;
            }
            if (driver.imagen == '') {
                driver.imagen = 'http://localhost:3001/images/driversDB/logo.png';
                return;
            }
        });
        
        res.status(200).json({matchingDrivers});
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { firstFifteen };
