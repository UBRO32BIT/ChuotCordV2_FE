import React from "react";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { GuildList } from "../../components/GuildList";
import { UserMiniCard } from "../../components/UserProfileCard/UserMiniCard";
import { Route, Routes } from "react-router-dom";
import ChatOverview from "../../components/ChatOverview/ChatOverview";
import GuildDetails from "../../components/GuildDetails/GuildDetails";
import GuildAddition from "../../components/GuildAddition/GuildAddition";
import { useSnackbar } from "notistack";
import { useSocket } from "../../context/SocketProvider";

export default function Chat() {
    const socket = useSocket();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const fetchSocketStatus = () => {
        if (!socket.connected) {
            enqueueSnackbar(`You are disconnected`, {
                variant: "error",
                persist: true,
                preventDuplicate: true,
                action: (snackbarId) => (
                    <Button onClick={() => handleReconnect(snackbarId)}>
                        <Typography color={"white"}>Reconnect</Typography>
                    </Button>
                ),
            });
        }
    };

    const handleReconnect = (snackbarId: any) => {
        // Attempt to reconnect the socket
        socket.connect();

        // Once the socket is connected, dismiss the snackbar
        socket.on("connect", () => {
            closeSnackbar(snackbarId);
            enqueueSnackbar("Reconnected successfully", { variant: "success" });
        });

        // Handle potential reconnection errors
        socket.on("connect_error", (err) => {
            enqueueSnackbar(`Reconnect failed: ${err.message}`, { variant: "error" });
        });
    };

    React.useEffect(() => {
        // Set up the interval to check socket status every second
        const intervalId = setInterval(fetchSocketStatus, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <Grid container sx={{ height: "100vh" }}>
            <Grid
                item
                md={2}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                    borderRight: "1px solid grey",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        overflowY: "auto",
                    }}
                >
                    <Box sx={{ flex: "0 1 auto" }}>
                        <UserMiniCard />
                    </Box>
                    <Divider variant="middle" />
                    <Box sx={{ flex: "1 1 auto", overflowY: "auto", overflowX: "hidden" }}>
                        <GuildList />
                    </Box>
                    <Box sx={{ flex: "0 1 auto" }}>
                        <Divider />
                        <GuildAddition />
                    </Box>
                </Box>
            </Grid>
            <Grid item md={10}>
                <Routes>
                    <Route path="/" element={<ChatOverview />} />
                    <Route path="/:guildId/*" element={<GuildDetails />} />
                </Routes>
            </Grid>
        </Grid>
    );
}
