import Box from "@mui/material/Box";
import { Message } from "../../shared/message.interface";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { formatDateTime } from "../../utils/date";

export default function MessageComponent(message: Message) {
    return <Box sx={{
        display: "flex",
        gap: 1,
        py: 0.5,
    }}>
        <Box>
            <Avatar
                src={message.sender.profilePicture}
                alt={""}
                sx={{ width: 42, height: 42 }}
            />
        </Box>
        <Box>
            <Box sx={{
                display: "flex",
                gap: 1,
                alignItems: "center"
            }}>
                <Typography variant="body1" fontWeight="bold">
                    {message.sender.username}
                </Typography>
                <Typography variant="body2" color={"gray"}>{formatDateTime(message.timestamp)}</Typography>
            </Box>
            <Box>
                {message.content}
            </Box>
        </Box>
    </Box>
}