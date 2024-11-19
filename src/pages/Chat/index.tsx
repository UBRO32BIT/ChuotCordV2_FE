import { Box, Divider, Grid } from "@mui/material";
import { GuildList } from "../../components/GuildList";
import { UserMiniCard } from "../../components/UserProfileCard/UserMiniCard";
import { Route, Routes } from "react-router-dom";
import ChatOverview from "../../components/ChatOverview/ChatOverview";
import GuildDetails from "../../components/GuildDetails/GuildDetails";
import GuildAddition from "../../components/GuildAddition/GuildAddition";

export default function Chat() {
    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid item md={2} sx={{ display: 'flex', flexDirection: 'column', height: '100vh', borderRight: '1px solid grey' }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    overflowY: "auto", 
                }}>
                    <Box sx={{ flex: '0 1 auto' }}>
                        <UserMiniCard />
                    </Box>
                    <Divider variant="middle" />
                    <Box sx={{ flex: '1 1 auto', overflowY: "auto", overflowX: "hidden" }}>
                        <GuildList />
                    </Box>
                    <Box sx={{ flex: '0 1 auto' }}>
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