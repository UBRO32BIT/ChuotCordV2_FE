import { Box, Divider, Grid } from "@mui/material";
import { GuildList } from "../../components/GuildList";
import { UserMiniCard } from "../../components/UserProfileCard/UserMiniCard";
import MessageList from "../../components/MessageList/MessageList";
import GuildInfo from "../../components/GuildInfo/GuildInfo";
import { Route, Routes } from "react-router-dom";
import ChatOverview from "../../components/ChatOverview/ChatOverview";
import GuildDetails from "../../components/GuildDetails/GuildDetails";

export default function Chat() {
    return (
        <Grid container>
            <Grid item md={2}>
                <Box sx={{ borderRight: '1px solid grey', height: '100vh' }}>
                    <Box>
                        <UserMiniCard/>
                    </Box>
                    <Divider variant="middle" />
                    <Box>
                        <GuildList/>
                    </Box>
                </Box>
            </Grid>
            <Grid item md={10}>
            <Routes>
                <Route>
                    <Route path="/" element={<ChatOverview/>}/>
                    <Route path="/:guildId" element={<GuildDetails/>} />
                </Route>
              </Routes>
            </Grid>
        </Grid>
    )
}