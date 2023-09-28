import { GET_TEAMS,GET_DRIVERS,GET_DRIVERS_NAME,ORDER,FILTER} from './actionTypes';

const initialState = {
  teams: [],
  nationalitys: [],
  drivers: [],
  filteredDrivers: []
};


const reducer = (state = initialState, action) => {
    switch (action.type) {

      case GET_DRIVERS:
        return {
          ...state,
          drivers: action.payload
        };

      case GET_DRIVERS_NAME:
        return {
          ...state,
          drivers: action.payload
        };

      case GET_TEAMS: 
          return { 
          ...state, 
          teams: action.payload.teamsList,
          nationalitys: action.payload.nationalitysList       
        };

      case FILTER:
          const teamsFilter = action.payload.teams; // Valor ingresado por el usuario para teams
          const nationalityFilter = action.payload.nationality; // Valor ingresado por el usuario para nationality
          const idFilter = action.payload.idFilter; // Valor ingresado por el usuario para idFilter
        
          const filtered = state.drivers.filter(driver => {
            // Dividir la cadena driver.teams en un array de equipos
            const driverTeams = driver.teams.split(',').map(team => team.trim());
        
            // Verificar si al menos uno de los equipos seleccionados por el usuario está presente en driver.teams
            const teamsMatch =
              (!teamsFilter || teamsFilter === 'All' || driverTeams.includes(teamsFilter));
        
            // Filtrar por nationality
            const nationalityMatch =
              (!nationalityFilter || nationalityFilter === 'All' || driver.nationality === nationalityFilter);
        
            // Filtrar por idFilter
            const idMatch =
              (!idFilter || idFilter === 'All' || // Si idFilter es 'All', incluir todos los elementos
                (idFilter === 'API' && driver.id >= 1 && driver.id <= 508) || // Si idFilter es 'API', incluir de 1 a 508
                (idFilter === 'DB' && driver.id >= 509)); // Si idFilter es 'DB', incluir desde 509 en adelante
        
            return teamsMatch && nationalityMatch && idMatch;
          });
          if (filtered.length === 0) {
            console.log(filtered);
          }
          return {
            ...state,
            filteredDrivers: filtered // La estructura de filtered coincide con la estructura original de state.drivers
          };
        
      case ORDER:
        const orderDrivers = [...state.filteredDrivers];
        const tipo = action.payload.tipoOrder;
        const sentido = action.payload.sentidoOrder;


        switch (tipo) {
          case "alfabetico":
            switch (sentido) {
              case "A":
                orderDrivers.sort((a, b) => {
                  const nameA= a.name && a.name.surname ? a.name.surname : a.lastname;
                  const nameB= b.name && b.name.surname ? b.name.surname : b.lastname;
                  return nameA.localeCompare(nameB);
                });
                break;
              case "D":
                orderDrivers.sort((a, b) => {
                  const nameA= a.name && a.name.surname ? a.name.surname : a.lastname;
                  const nameB= b.name && b.name.surname ? b.name.surname : b.lastname;
                  return nameB.localeCompare(nameA);
                });
                break;
              default:
                break;
            }
            break;
          case "nacimiento":
            switch (sentido) {
              case "A":
                orderDrivers.sort((a, b) => {
                  const dateA = a.dob || a.birthdate;
                  const dateB = b.dob || b.birthdate;
                  return new Date(dateA) - new Date(dateB);
                });
                break;
              case "D":
                orderDrivers.sort((a, b) => {
                  const dateA = a.dob || a.birthdate;
                  const dateB = b.dob || b.birthdate;
                  return new Date(dateB) - new Date(dateA);
                });
                break;
            }          
            break;        
          default:
            break;
        }
        return {
          ...state,
          filteredDrivers: orderDrivers,
        };   
      
        default: return {...state};
    }
  };


  export { reducer as rootReducer, initialState };