import axiosClient from "./apiService";

const GetMessageByChannelId = async (guildId: string, channelId: string) => {
    return axiosClient.get(`/guilds/${guildId}/channels/${channelId}/messages`)
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            console.error(error);
            throw Error(error.response.data.message)
        })
}

const AddMessage = async (guildId: string, channelId: string, payload: FormData) => {
    return axiosClient.post(`/guilds/${guildId}/channels/${channelId}/messages`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            console.error(error);
            throw Error(error.response.data.message)
        })
}

export {
    GetMessageByChannelId,
    AddMessage
}