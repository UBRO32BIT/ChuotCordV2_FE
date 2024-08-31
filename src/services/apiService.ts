import axios, { AxiosRequestConfig } from 'axios';
import { RefreshToken } from './auth.service';
import { getAccessToken, removeAccessToken, setAccessToken } from '../utils/localStorage';

let store: any;

export const injectStore = (_store: any) => {
    store = _store
}

// Define the structure of a retry queue item
interface RetryQueueItem {
    resolve: (value?: any) => void;
    reject: (error?: any) => void;
    config: AxiosRequestConfig;
}

// Create a list to hold the request queue
const refreshAndRetryQueue: RetryQueueItem[] = [];

// Flag to prevent multiple token refresh requests
let isRefreshing = false;

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
    //console.log(store.getState().accessToken.token);
    //config.headers.Authorization = store.getState().accessToken.token;
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return config;
})

axiosClient.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const originalRequest: AxiosRequestConfig = error.config;

        if (error.response && error.response.status === 401) {
            console.log("unauth");
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    // Refresh the access token
                    const newAccessToken = await RefreshToken();

                    // Update the request headers with the new access token
                    error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    setAccessToken(newAccessToken);

                    // Retry all requests in the queue with the new token
                    refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
                        axiosClient
                            .request(config)
                            .then((response) => resolve(response))
                            .catch((err) => reject(err));
                    });

                    // Clear the queue
                    refreshAndRetryQueue.length = 0;

                    // Retry the original request
                    return axiosClient(originalRequest);
                } catch (refreshError) {
                    console.log(refreshError);
                    // Handle token refresh error
                    // You can clear all storage and redirect the user to the login page
                    //throw refreshError;
                    removeAccessToken();
                    window.location.href = `http://localhost:3000/login`;
                } finally {
                    isRefreshing = false;
                }
            }

            // Add the original request to the queue
            return new Promise<void>((resolve, reject) => {
                refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
            });
        }

        // Return a Promise rejection if the status code is not 401
        return Promise.reject(error);
        // let res = error.response;
        // if (res?.response?.status === 401) {
        //     try {
        //         RefreshToken();
        //     }
        //     catch (error) {
        //         window.location.href = `http://localhost:3000/login`;
        //     }
        //     return null;
        // }
        // else {
        //     console.error(`Looks like there was a problem. Status Code: ` + res?.response?.status);
        //     return Promise.reject(error);
        // }
    }
);

export default axiosClient;