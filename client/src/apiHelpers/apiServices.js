import axios from "axios";

const localEndpoint = 'https://server-zl85.onrender.com/';

export async function newDriver(formData) {
    try {
        console.log(formData);
        const response = await axios.post(`${localEndpoint}driver`, formData);
        return response.data;

    } catch (localError) {
        console.log(localError);
        throw localError;
    }
}
export async function newNationality(formData) {
    try {
        console.log(formData);
        const response = await axios.post(`${localEndpoint}nation`, formData);
        return response.data;

    } catch (localError) {
        console.log(localError);
        throw localError;
    }
}

export const getDetails = async (id) => {
    try {

      const response = await axios.get(`${ipEndpoint}drivers/${id}`);
      //console.log(response.data);
      return response.data;

    } catch (localError) {
        console.log(localError);
        throw localError;
    }
  };
