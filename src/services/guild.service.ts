import axiosClient from "./apiService"

const GetGuilds = async () => {
    return axiosClient.post(`/guild`)
    .then((res) => {
        return res.data.data;
    })
    .catch((error) => {
        console.error(error);
        throw Error(error.response.data.message)
    })
}
export {
    GetGuilds,
}