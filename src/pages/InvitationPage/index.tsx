import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { GetInviteByCode } from "../../services/invite.service";
import Box from "@mui/material/Box";
import { Invite } from "../../shared/guild.interface";
import { Button, Grid, Skeleton, Typography } from "@mui/material";

export default function InvitationPage() {
    const [invite, setInvite] = React.useState<Invite>();
    const { inviteCode } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loadInvite = async () => {
        if (inviteCode) {
            const data = await GetInviteByCode(inviteCode);
            const result: Invite = {
                _id: data._id,
                string: data.string,
                creator: data.creator,
                guild: data.guild,
            }
            setInvite(result);
            console.log(result);
        }
    }
    const joinGuildByInviteCode = async () => {

    }

    React.useEffect(() => {
        loadInvite();
    }, [inviteCode])

    React.useEffect(() => {

    }, [invite])

    return <Grid container>
        <Grid item md={3}></Grid>
        <Grid item md={6}>
        {invite ? (
            <Box>
                <Typography>You have invited to {invite.guild.name}</Typography>
                <Button>Join Guild</Button>
            </Box>
        ) : (
            <Box>
                <Skeleton variant="rectangular"/>
            </Box>
        )}
        </Grid>
        <Grid item md={3}></Grid>
        
    </Grid>
}