import axios from "axios";

const BASE_URL = "https://restcountries.com/v3.1";

const fetchAllCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export default {
  fetchAllCountries,
};
