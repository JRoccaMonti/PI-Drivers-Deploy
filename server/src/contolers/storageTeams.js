/*
GET | /teams
Obtiene un arreglo con todos los teams existentes de la API.
En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los teams que encuentres en la API.
Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.
*/

const axios = require('axios');
const { Teams , Nationality} = require('../db');

const storageTeams = async (req, res) => {
    try {

        if (await Teams.count() === 0 || await Nationality.count() === 0 ) {
            const response = await axios.get('http://localhost:5000/drivers'); // peticion get al api
            const list = response.data; // guarda los datos

            if (list.error) { // si es error da 404
                return res.status(404).json({message: "Not found"});
            };

            const nationalityList =new Set();
            const teamList =new Set();
            
            for (const driver of list) {
                if (driver.teams) { // Verifica si 'teams' existe en el objeto 'driver'
                    const teams = driver.teams.split(/,\s*|\s*,/); // Divide la cadena por comas con o sin espacio
                    //const nationalitys = driver.nationality;
                    teams.forEach(team => {
                        teamList.add(team.trim());
                    });
                    
                    nationalityList.add(driver.nationality);
                };
            };

            for (const nationalityName of nationalityList) {
                const [nationality, created] = await Nationality.findOrCreate({
                    where: { name: nationalityName },
                    defaults: { name: nationalityName },
                });
            };

            for (const teamName of teamList) {
                const [team, created] = await Teams.findOrCreate({
                    where: { name: teamName },
                    defaults: { name: teamName },
                });
            }
        }
        
        const teamsList = (await Teams.findAll()).map(team => ({ value: team.id, text: team.name }));
        const nationalitysList = (await Nationality.findAll()).map(nationality => ({ value: nationality.id, text: nationality.name }));

        nationalitysList.sort((a, b) => {
            const nameA = a.text.toUpperCase();
            const nameB = b.text.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });


        res.status(200).json({teamsList,nationalitysList}); // envia las listas

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports={storageTeams};