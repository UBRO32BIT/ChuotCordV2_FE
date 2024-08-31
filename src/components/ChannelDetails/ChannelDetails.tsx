import { Button, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { closeSnackbar, useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { Channel } from "../../shared/guild.interface";
import React from "react";
import { getChannelById } from "../../services/channel.service";
import TagIcon from '@mui/icons-material/Tag';
import MessageList from "../MessageList/MessageList";
import MessageForm from "../MessageForm/MessageForm";
import MenuIcon from '@mui/icons-material/Menu';
import { useSocket } from "../../context/SocketProvider";

const action = (snackbarId: any) => (
    <>
      <Button>
        <Typography color={'white'}>Reconnect</Typography>
      </Button>
      {/* <button onClick={() => { alert(`I belong to snackbar with id ${snackbarId}`); }}>
        Undo
      </button>
      <button onClick={() => { closeSnackbar(snackbarId) }}>
        Dismiss
      </button> */}
    </>
  );

export default function ChannelDetails() {
    const { guildId } = useParams();
    const { channelId } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const socket = useSocket();
    const [channel, setChannel] = React.useState<Channel>();
    const joinChannelSocket = () => {
        socket.emit('user_connect_channel', {
            channelId: channelId
        })
        // Clean up the event listener on component unmount
        // return () => {
        //     socket.off("chat");
        // };
    }
    const fetchSocketStatus = () => {
        if (!socket.connected) {
            enqueueSnackbar(`You are disconnected`, { variant: "error", persist: true, preventDuplicate: true, action });
        }
    }
    const fetchChannelDetails = async (guildId: string, channelId: string) => {
        try {
            const result = await getChannelById(guildId, channelId);
            if (result) {
                setChannel(result);
            }
            else throw Error("Channel data not found");
        }
        catch (error: any) {
            enqueueSnackbar(`${error.message}`, { variant: "error" });
            navigate("/chat");
        }
    }
    React.useEffect(() => {
        // Set up the interval to run every second (1000 milliseconds)
        const intervalId = setInterval(fetchSocketStatus, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures this runs once on mount
    React.useEffect(() => {
        if (guildId && channelId) {
            fetchChannelDetails(guildId, channelId);
            joinChannelSocket();
        }
    }, [channelId, socket])
    return <>
        {channel && (
            <Box sx={{
                overflow: "hidden",
                height: "100dvh",
            }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1,
                    }}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        p: 1
                    }}>
                        <TagIcon />
                        <Typography>{channel?.name}</Typography>
                    </Box>
                    <Box sx={{
                        px: 2
                    }}>
                        <MenuIcon/>
                    </Box>
                </Box>
                <Divider variant="middle" />
                <Box sx={{
                    overflow: "auto",
                    overflowWrap: "break-word",
                    height: "91dvh"
                }}>
                    <MessageList />
                </Box>
                <Box>
                    <MessageForm {...channel} />
                </Box>
            </Box>
        )}
    </>
}