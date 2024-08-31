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

export {
    GetMessageByChannelId,
}