import { LoginData, RefreshTokenData, RegisterData } from "../shared/auth.interface"
import axiosClient from "./apiService"

const LoginWithCredentials = async (data: LoginData) => {
    return axiosClient.post(`/auth/login`, data)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            console.error(error);
            throw Error(error.response.data.message)
        })
}

const Register = async (data: RegisterData) => {
    return axiosClient.post(`/auth/register`, data)
        .then((res) => {

        })
        .catch((error) => {

        })
}

const RefreshToken = async (data: RefreshTokenData) => {
    return axiosClient.post(`/auth/refresh`, data)
        .then((res) => {

        })
}

export {
    LoginWithCredentials,
    Register,
}