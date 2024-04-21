const BASE_URL = "https://restcountries.com/v3.1";

const fetchAllCountries = async () => {
  try {
    const response = await fetch(`${BASE_URL}/all`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export default {
  fetchAllCountries,
};
