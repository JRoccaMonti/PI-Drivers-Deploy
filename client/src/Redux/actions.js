import { GET_TEAMS,GET_DRIVERS,GET_DRIVERS_NAME,ORDER,FILTER} from './actionTypes';
import axios from "axios";

export const getTeams = () => {
  return (dispatch) => {
      const localEndpoint = 'http://localhost:3001/teams';
      const ipEndpoint = 'http://192.168.1.83:3001/teams';
      axios.get(localEndpoint)
          .then(({ data }) => {
              dispatch({
                  type: GET_TEAMS,
                  payload: {
                    teamsList: data.teamsList,
                    nationalitysList: data.nationalitysList,
                  },
              });
          })
          .catch((localError) => {
              axios.get(ipEndpoint)
                  .then(({ data }) => {
                      dispatch({
                          type: GET_TEAMS,
                          payload: {
                            teamsList: data.teamsList,
                            nationalitysList: data.nationalitysList,
                          }
                      });
                  })
                  .catch((ipError) => {
                      console.error('Error en solicitud por IP:', ipError);
                  });
          });
  };
};

export const getDrivers = () => {
    return (dispatch) => {
        const localEndpoint = 'http://localhost:3001/drivers';
        const ipEndpoint = 'http://192.168.1.83:3001/drivers';

        axios.get(localEndpoint)
            .then(({ data }) => {
                dispatch({
                    type: GET_DRIVERS,
                    payload: data.combinedArray,
                });
            })
            .catch((localError) => {

                axios.get(ipEndpoint)
                    .then(({ data }) => {
                        dispatch({
                            type: GET_DRIVERS,
                            payload: data.combinedArray,
                        });
                    })
                    .catch((ipError) => {
                        console.error('Error en solicitud por IP:', ipError);
                    });
            });
    };
};

export const getDriversName = (name) => {
    if (name === "") {
        return getDrivers();
    }
    return (dispatch) => {
        const localEndpoint = ('http://localhost:3001/drivers/name?name=' + name);
        const ipEndpoint = 'http://192.168.1.83:3001/drivers/name?name=' + name;

        axios.get(localEndpoint)
            .then(({ data }) => {
                dispatch({
                    type: GET_DRIVERS_NAME,
                    payload: data.matchingDrivers,
                });
            })
            .catch((localError) => {

                axios.get(ipEndpoint)
                    .then(({ data }) => {
                        dispatch({
                            type: GET_DRIVERS_NAME,
                            payload: data.matchingDrivers,
                        });
                    })
                    .catch((ipError) => {
                        console.error('Error en solicitud por IP:', ipError);
                    });
            });
    };
};

export const applyFilter = (teams, nationality, idFilter) => ({
    type: FILTER,
    payload: { teams, nationality, idFilter},
});

export const orderCards = (tipoOrder, sentidoOrder) => {
    return {
      type: ORDER,
      payload: { sentidoOrder,tipoOrder,  },
    };
};
  



