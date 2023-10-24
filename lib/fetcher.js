import axios from 'axios';

const BASE_URL =
  'https://stories-api-express-production.up.railway.app/stories';
// const BASE_URL = 'http://localhost:5000/stories';

export const fetchStories = async () => {
  try {
    const { data } = await axios.get(BASE_URL);

    return data?.results;
  } catch (error) {
    console.log(error);
  }
};
