import { Switch } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";

export default function LayoutSettings() {
    const [isDark, setIsDark] = React.useState(false);
    const toggleTheme = () => {

    }
    return <Grid container sx={{ height: "100vh" }}>
        <Grid
            item
            md={10}
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
            }}
        >
            <Box sx={{
                textAlign: "start"
            }}>
                <Typography variant="h2">Dark mode</Typography>
                <Switch checked={isDark}/>
            </Box>
        </Grid>
    </Grid>
}