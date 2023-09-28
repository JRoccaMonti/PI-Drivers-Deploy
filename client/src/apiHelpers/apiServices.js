import axios from "axios";

const localEndpoint = 'https://server-zl85.onrender.com/';
const ipEndpoint = 'http://192.168.1.83:3001/';

export async function newDriver(formData) {
    try {
        console.log(formData);
        const response = await axios.post(`${localEndpoint}driver`, formData);
        return response.data;

    } catch (localError) {
        try {
            const ipResponse = await axios.post(`${ipEndpoint}driver`, formData);
            return ipResponse.data;
        } catch (ipError) {
            throw ipError;
        }
    }
}
export async function newNationality(formData) {
    try {
        console.log(formData);
        const response = await axios.post(`${localEndpoint}nation`, formData);
        return response.data;

    } catch (localError) {
        try {
            const ipResponse = await axios.post(`${ipEndpoint}nation`, formData);
            return ipResponse.data;
        } catch (ipError) {
            throw ipError;
        }
    }
}

export const getDetails = async (id) => {
    try {

      const response = await axios.get(`${ipEndpoint}drivers/${id}`);
      //console.log(response.data);
      return response.data;

    } catch (localError) {
        try {
            const ipResponse = await axios.post(`${ipEndpoint}drivers/${id}`);
            return ipResponse.data;

        } catch (ipError) {
            throw ipError;
        }
    }
  };
