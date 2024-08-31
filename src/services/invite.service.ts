import axiosClient from "./apiService";

const GetInvitesByGuildId = async (guildId: string) => {
    return axiosClient.get(`/guilds/${guildId}/invites`)
    .then((res) => {
        return res.data.data;
    })
    .catch((error) => {
        console.error(error);
        throw Error(error.response.data.message)
    })
}

const GetInviteByCode = async (code: string) => {
    return axiosClient.get(`/invites/${code}`)
    .then((res) => {
        return res.data.data;
    })
    .catch((error) => {
        console.error(error);
        throw Error(error.response.data.message)
    })
}

export {
    GetInvitesByGuildId,
    GetInviteByCode,
}