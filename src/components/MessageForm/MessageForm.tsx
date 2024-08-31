import { FormControl, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useSocket } from "../../context/SocketProvider";
import { Channel } from "../../shared/guild.interface";

export default function MessageForm(channel: Channel) {
    const [message, setMessage] = React.useState<string>('');
    const socket = useSocket();

    const onMessageChange = (event: any) => {
        setMessage(event.target.value)
    }
    const onChatSubmit = (event: any) => {
        try {
            event.preventDefault();
            const message = event.target.message.value.trim();
            if (message !== '') {
                socket.emit("chat", {
                    channelId: channel._id,
                    message: event.target.message.value,
                })
                setMessage('');
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    
    return <Box>
        <form onSubmit={onChatSubmit}>
            {/* Image append */}
            <Box></Box>
            <Box sx={{
                display: "flex",
                px: 3,
            }}>
                <input 
                        type="text"
                        name="message"
                        value={message}
                        onChange={onMessageChange}
                        autoComplete="off" 
                        placeholder="Type something..."
                        style={{
                            width: "100%",
                        }}
                />
            </Box>
        </form>
    </Box>
}