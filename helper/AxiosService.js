import axios from 'axios';
const instance = axios.create({
  // baseURL: `${process.env.REACT_APP_API_GLOBAL || process.env.REACT_APP_API_LOCAL
  //   }`,
  // baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
});




export default instance;
