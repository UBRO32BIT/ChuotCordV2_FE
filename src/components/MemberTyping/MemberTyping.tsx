import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";

export default function MemberTyping() {
    const {guildId, channelId} = useParams();
    const userTyping = () => {

    }
    const userDoneTyping = () => {
        
    }
    return <Box sx={{
        textAlign: "start",
    }}>
        ubro3 is typing
    </Box>
}