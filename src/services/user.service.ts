import axiosClient from "./apiService";

const getGuildsByUserId = async () => {
    return axiosClient.get(`/users/guilds`)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            console.error(error);
            throw Error(error.response.data.message)
        })
}

export {
    getGuildsByUserId,
}