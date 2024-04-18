import axios from 'axios';

let store: any;

export const injectStore = (_store: any) => {
  store = _store
}

const axiosClient = axios.create({
    baseURL: `http://localhost:8080/v1`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:8080',
    },
    withCredentials: true,
});

// Add an interceptor to set the Authorization header before each request
axiosClient.interceptors.request.use(config => {
    console.log(store.getState().accessToken.token);
    //config.headers.Authorization = store.getState().accessToken
    return config
  })
axiosClient.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        let res = error.response;
        if (res?.response?.status === 401) {
            window.location.href = `http://localhost:3000/login`;
        }
        console.error(`Looks like there was a problem. Status Code: ` + res?.response?.status);
        return Promise.reject(error);
    }
);

export default axiosClient;