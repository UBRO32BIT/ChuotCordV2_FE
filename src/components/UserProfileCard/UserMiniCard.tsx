import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

export const UserMiniCard = () => {
    const user = useSelector((state: any) => state.user.user);
    return <Box>
        <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            p: 1
        }}>
            <Avatar 
                src={user.profilePicture} 
                alt={user.username}
                sx={{ width: 36, height: 36}}
            />
            <Typography>{user.username}</Typography>
        </Box>
    </Box>
}