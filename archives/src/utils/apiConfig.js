import axios from 'axios';

const noAuthAxios = axios.create({
  // baseURL: 'http://localhost:3000/',
  baseURL: 'http://api-ddstr.veridata-dev.com/',
  // baseURL: 'http://localhost/mock/data.php?url=',
  headers: { 'Content-Type': 'application/json' },
});

const authAxios = axios.create({
  // baseURL: 'http://localhost:3000/ts',
  baseURL: 'http://api-ddstr.veridata-dev.com/ts',
  // baseURL: 'http://localhost/mock/data.php?url=',
  headers: { 'Content-Type': 'application/json' },
});

export { noAuthAxios, authAxios };
