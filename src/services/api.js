import axios from 'axios';
// pKMrFXWH2bxhdmFZodJXI8F1RKQf4aKXBoshu4xb fNivcHugzSGopfFQATzFGP0EDTIqrbeZC38m3jVs
const apiKey = 'pKMrFXWH2bxhdmFZodJXI8F1RKQf4aKXBoshu4xb';
const api = axios.create({
  baseURL: 'https://api.nasa.gov/mars-photos/api/v1',
  params: {
    api_key: apiKey
  }
});

export default api;
