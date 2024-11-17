import React from "react";
import { useSocket } from "../../context/SocketProvider"
import { Message } from "../../shared/message.interface";
import Box from "@mui/material/Box";
import MessageComponent from "../Message/MessageComponent";
import { GetMessageByChannelId } from "../../services/message.service";
import { useParams } from "react-router-dom";

export default function MessageList() {
    const {guildId, channelId} = useParams();
    const socket = useSocket();
    const messagesRef = React.useRef<HTMLDivElement | null>(null);
    const bottomRef = React.useRef<HTMLDivElement | null>(null);
    const [messages, setMessages] = React.useState<Message[]>([]);
    
    const fetchMessageList = async () => {
        if (guildId && channelId) {
            const result = await GetMessageByChannelId(guildId, channelId);
            console.log(result);
            setMessages(result);
        }
    }
    const handleMessagesScroll = () => {
        console.log(messagesRef.current?.scrollTop);
    }

    React.useEffect(() => {
        if (bottomRef.current && messagesRef.current?.scrollTop === 0) {
            // Scroll to the bottom of the element on component load
            bottomRef.current.scrollIntoView({ behavior: 'instant' } as any);
        }
    }, [messages]);
    React.useEffect(() => {
        if (socket) {
            socket.on("chat_received", (data) => {
                // Mapping the received data to the Message interface
                const newMessage: Message = data;
                console.log(newMessage);
                // Append the new message to the messages array
                setMessages([...messages, newMessage]);
            });
        }
    }, [socket, messages])

    React.useEffect(() => {
        fetchMessageList();
    }, [channelId, guildId])

    return <Box 
    ref={messagesRef}
    onScroll={handleMessagesScroll}
    sx={{
        textAlign: "left",
        pl: 1,
        overflowX: "auto",
    }}>
        {messages.map((message) => (
            <MessageComponent key={message._id} {...message}/>
        ))}
        <Box ref={bottomRef}></Box>
    </Box>
}