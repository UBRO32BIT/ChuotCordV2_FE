
export interface GuildPartial {
    _id: string,
    name: string,
    image: string | null,
}

export interface Guild {
    _id: string,
    name: string,
    owner: string,
    roles: Role[],
    members: Member[],
    channels: Channel[]
}

export interface Role {
    _id: string,
    name: string,
}
export interface Member {
    _id: string,
    roles: Role[],
    memberId: string,
    timestamp: Date,
}
export interface Channel {
    _id: string,
    name: string,
    roles: Role[],
}