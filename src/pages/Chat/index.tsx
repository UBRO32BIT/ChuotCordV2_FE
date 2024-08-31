import { Box, Divider, Grid } from "@mui/material";
import { GuildList } from "../../components/GuildList";
import { UserMiniCard } from "../../components/UserProfileCard/UserMiniCard";
import { Route, Routes } from "react-router-dom";
import ChatOverview from "../../components/ChatOverview/ChatOverview";
import GuildDetails from "../../components/GuildDetails/GuildDetails";
import GuildAddition from "../../components/GuildAddition/GuildAddition";

export default function Chat() {
    return (
        <Grid container>
            <Grid item md={2}>
                <Box sx={{ 
                    borderRight: '1px solid grey', 
                    height: '100vh',
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        overflowY: "auto",
                        height: "7dvh",
                    }}>
                        <UserMiniCard/>
                    </Box>
                    <Divider variant="middle" />
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        overflowY: "auto",
                        height: "80dvh",
                        overflowX: "hidden"
                    }}>
                        <GuildList/>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        overflowY: "auto",
                        height: "13dvh",
                    }}>
                        <Divider/>
                        <GuildAddition/>
                    </Box>
                </Box>
            </Grid>
            <Grid item md={10}>
                <Routes>
                    <Route>
                        <Route path="/" element={<ChatOverview/>}/>
                        <Route path="/:guildId/*" element={<GuildDetails/>} />
                    </Route>
              </Routes>
            </Grid>
        </Grid>
    )
}