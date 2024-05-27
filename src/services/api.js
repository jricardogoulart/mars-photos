import axios from 'axios';

const apiKey = 'fNivcHugzSGopfFQATzFGP0EDTIqrbeZC38m3jVs';
const api = axios.create({
  baseURL: 'https://api.nasa.gov/mars-photos/api/v1',
  params: {
    api_key: apiKey
  }
});

export default api;
