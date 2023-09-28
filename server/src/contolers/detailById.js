const axios = require('axios');
const { Driver, Teams, DriverTeam } = require('../db');

const detailById = async (req, res) => {
  try {
    const idSearch = req.params.idDriver;

    try {
      const response = await axios.get(`http://localhost:5000/drivers/${idSearch}`);

      if (response.data.image.url == '') {
          response.data.image.url = 'http://192.168.1.83:3001/images/driversDB/logo.png';
      }

      if (response.status === 200) {
        return res.status(200).json(response.data);
      }
    } catch (error) {
    }

    const drivers = await Driver.findByPk(idSearch, {
      attributes: ['id', 'name', 'lastname', 'description', 'image', 'nationality', 'birthdate'],
    });

    const teams = await Teams.findAll({ attributes: ['id', 'name'],});
    
    // relacion
    const driverTeams = await DriverTeam.findAll({ attributes: ['DriverId', 'TeamId'],});
    
    // Crea un mapa para relacionar las asociaciones entre conductores y equipos.
    const driverTeamMap = new Map();        
    
    // Llena el mapa con las asociaciones entre conductores y equipos.
    driverTeams.forEach((driverTeam) => {           
      const driverId = driverTeam.DriverId;
      const teamId = driverTeam.TeamId;

      if (!driverTeamMap.has(driverId)) {
        driverTeamMap.set(driverId, []);
      }        

      driverTeamMap.get(driverId).push(teamId);
    });
    
    // Define una función llamada driversWithTeams para agregar equipos a un conductor.
    const driversWithTeams = (driver) => {
      const driverId = driver.id;
      const associatedTeamIds = driverTeamMap.get(driverId) || [];
        
      // Busca los equipos asociados usando los IDs.
      const associatedTeams = teams.filter((team) => associatedTeamIds.includes(team.id)).map((team) => team.name);
        
      // Agrega los equipos al objeto del conductor.
      return {
          ...driver.toJSON(),
          teams: associatedTeams.join(', '),
      };
    };

    const resul = driversWithTeams(drivers);
    
    if (drivers) {
      // Si se encontró un conductor localmente, aplica la función driversWithTeams y devuelve el resultado como JSON.
      return res.status(200).json(resul);
    } else {
      // Si no se encontró el conductor, devuelve un mensaje de error.
      return res.status(404).json({ message: 'Driver not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { detailById };


