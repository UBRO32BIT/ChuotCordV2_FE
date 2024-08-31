import { UserPartial } from "./user.interface";

export interface Message {
    _id: string,
    sender: UserPartial,
    reply_id?: string,
    content: string,
    attachments: string[],
    timestamp: string,
}