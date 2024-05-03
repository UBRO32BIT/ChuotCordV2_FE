import Grid from "@mui/material/Grid";
import MessageList from "../MessageList/MessageList";
import GuildInfo from "../GuildInfo/GuildInfo";
import Box from "@mui/material/Box";

export default function GuildDetails() {
    return <Grid container>
        <Grid item md={8}>
            <MessageList/>
        </Grid>
                
        <Grid item md={2}>
            <Box sx={{ borderLeft: '1px solid grey', height: '100vh' }}>
                <GuildInfo/>
            </Box>
        </Grid>
    </Grid>
}