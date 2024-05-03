export interface Message {
    _id: string,
    sender: string,
    reply_id: string | null,
    attachments: [],
    timestamp: Date,
}