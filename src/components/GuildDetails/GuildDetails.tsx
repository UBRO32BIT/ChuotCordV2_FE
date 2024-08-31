import Grid from "@mui/material/Grid";
import MessageList from "../MessageList/MessageList";
import GuildInfo from "../GuildInfo/GuildInfo";
import Box from "@mui/material/Box";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import React from "react";
import { GetGuildById } from "../../services/guild.service";
import { useSnackbar } from "notistack";
import { Guild } from "../../shared/guild.interface";
import ChannelDetails from "../ChannelDetails/ChannelDetails";
import GuildOverview from "../GuildOverview/GuildOverview";
import { Typography } from "@mui/material";

export default function GuildDetails() {
  const { guildId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [guild, setGuild] = React.useState<Guild>();
  const updateGuild = (updatedAttributes: any) => {
    setGuild(prevGuild => ({
        ...prevGuild,
        ...updatedAttributes
    }));
  };

  const fetchGuildDetails = async (guildId: string) => {
    try {
      const result = await GetGuildById(guildId);
      if (result) {
        setGuild(result);
      }
      else throw Error("Guild data not found");
      console.log(result);
    }
    catch (error: any) {
      enqueueSnackbar(`${error.message}`, { variant: "error" });
      navigate("/chat");
    }
  }

  React.useEffect(() => {
    if (guildId) {
      fetchGuildDetails(guildId);
    }
  }, [guildId])
  return <Grid container>
    {guild ? (
      <>
        <Grid item md={9.5}>
          <Box>
            <Routes>
              <Route>
                <Route path="/" element={<GuildOverview />} />
                <Route path="/channels/:channelId" element={<ChannelDetails />} />
              </Route>
            </Routes>
          </Box>
        </Grid>

        <Grid item md={2.5}>
          <Box sx={{ borderLeft: '1px solid grey', height: '100vh' }}>
            <GuildInfo guild={guild} updateGuild={updateGuild} />
          </Box>
        </Grid>
      </>
    ) : (
      <Typography>LOADING</Typography>
    )}
  </Grid>
}