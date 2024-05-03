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
            throw Error(error.response.data.message)
        })
}

const RefreshToken = async () => {
    return axiosClient.post(`/auth/refresh`)
        .then((res) => {
            return res.data.data.token;
        })
        .catch((error) => {
            throw Error(error.response.data.message)
        })
}

export {
    LoginWithCredentials,
    Register,
    RefreshToken,
}