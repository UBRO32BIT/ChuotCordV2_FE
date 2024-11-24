import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import SettingsIcon from '@mui/icons-material/Settings';
import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ListItemIcon, ListItemText } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/slices/userSlice";
import { OnlinePresence } from "../OnlinePresences/OnlinePresence";

export const UserMiniCard = () => {
    const user = useSelector((state: any) => state.user.user);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    const handleSettingClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/");
    };
    return <Box>
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    p: 1,
                }}
            >
                <Box sx={{ position: "relative", width: 36, height: 36 }}>
                    <Avatar
                        src={user.profilePicture}
                        alt={user.username}
                        sx={{ width: 36, height: 36 }}
                    />
                    <OnlinePresence onlinePresence={user.onlinePresence}/>
                </Box>
                <Typography>{user.username}</Typography>
            </Box>
            <Box sx={{
                px: 1
            }}>

                <IconButton
                    onClick={handleSettingClick}
                >
                    <SettingsIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon><PersonIcon /></ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon><InsertLinkIcon /></ListItemIcon>
                        <ListItemText>My invites</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon><LogoutIcon /></ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    </Box>
}