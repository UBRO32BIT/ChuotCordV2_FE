import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from '@mui/icons-material/Logout';
import AddLinkIcon from '@mui/icons-material/AddLink';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MenuList from "@mui/material/MenuList";
import { Guild, InvitePartial } from "../../shared/guild.interface";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import React, { ChangeEvent } from "react";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { DeleteGuild } from "../../services/guild.service";
import { removeGuild } from "../../redux/slices/guildsSlice";
import { useNavigate } from "react-router-dom";
import { Avatar, Chip, Divider, TextField } from "@mui/material";
import { GetInvitesByGuildId } from "../../services/invite.service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface GuildInfoProps {
    guild: Guild;
    updateGuild: (updatedAttributes: Partial<Guild>) => void;
}

const MAX_FILE_SIZE = 102400; //100KB
const updateGuildSchema = yup.object().shape({
    name: yup.string()
        .required("Guild name is required!"),
})
export default function GuildSettingsDropdown({guild, updateGuild}: GuildInfoProps) {
    const user = useSelector((state: any) => state.user.user);
    const {
        register: registerUpdateGuild,
        handleSubmit: handleUpdateGuild,
        setValue: setUpdateGuildValue,
        formState: { errors: updateGuildErrors }
    } = useForm({
        resolver: yupResolver(updateGuildSchema),
    })
    const [invites, setInvites] = React.useState<InvitePartial[]>([]);
    const [guildImage, setGuildImage] = React.useState<File>();
    const [guildImageSrc, setGuildImageSrc] = React.useState<string>('');
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [openInviteDialog, setOpenInviteDialog] = React.useState(false);
    const [openDisbandDialog, setOpenDisbandDialog] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchInvites = async () => {
        const result = await GetInvitesByGuildId(guild._id);
        setInvites(result);
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setGuildImage(e.target.files[0]);
        }
    };
    const handleClickOpenEditDialog = () => {
        setOpenEditDialog(true);
    }
    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    }
    const handleClickOpenDisbandDialog = () => {
        setOpenDisbandDialog(true);
    };
    const handleCloseDisbandDialog = () => {
        setOpenDisbandDialog(false);
    };
    const handleClickOpenInviteDialog = async () => {
        setOpenInviteDialog(true);
        await fetchInvites();
    };
    const handleCloseInviteDialog = () => {
        setOpenInviteDialog(false);
    };

    const onUpdateGuild = async (event: any) => {
        try {
            console.log(event);
        }
        catch (error) {

        }
    }
    const disbandGuild = async () => {
        try {
            const result = await DeleteGuild(guild._id);
            dispatch(removeGuild(guild._id));
            handleCloseDisbandDialog();
            enqueueSnackbar(`Guild deleted successfully.`, { variant: "success" });
            navigate("/chat");
        }
        catch (error: any) {
            console.log(error);
            enqueueSnackbar(`${error.message}`, { variant: "error" });
        }
    }
    React.useEffect(() => {
        console.log(guildImage);
        if (guildImage) {
            const objectUrl = URL.createObjectURL(guildImage);
            setGuildImageSrc(objectUrl);
        
            // Clean up the object URL when the component unmounts or the file changes
            return () => URL.revokeObjectURL(objectUrl);
        } else if (guild.image) {
            setGuildImageSrc(guild.image);
        }
    }, [guild, guildImage])
    React.useEffect(() => {
        console.log(guild?.name);
    }, [guild])
    return <Box>
        <Accordion
            square={true}
            defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography variant="button" fontWeight="bold">Guild Actions</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{
                m: 0,
                p: 0,
            }}>
                <MenuList>
                    <MenuItem>
                        <Box onClick={handleClickOpenEditDialog}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0,
                            }}>
                            <ListItemIcon><EditIcon /></ListItemIcon>
                            <ListItemText>Edit guild profile</ListItemText>
                        </Box>
                    </MenuItem>
                    <MenuItem>
                        <Box onClick={handleClickOpenInviteDialog}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0,
                            }}>
                            <ListItemIcon><AddLinkIcon /></ListItemIcon>
                            <ListItemText>Invite people</ListItemText>
                        </Box>
                    </MenuItem>
                    <MenuItem>
                        {guild && guild.owner === user._id ? (
                            <Box
                                onClick={handleClickOpenDisbandDialog}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0,
                                }}>
                                <ListItemIcon><DeleteForeverIcon /></ListItemIcon>
                                <ListItemText>Disband guild</ListItemText>
                            </Box>
                        ) : (
                            <>
                                <ListItemIcon><LogoutIcon /></ListItemIcon>
                                <ListItemText>Leave guild</ListItemText>
                            </>
                        )}
                    </MenuItem>
                </MenuList>
            </AccordionDetails>
        </Accordion>

        <Dialog
            open={openDisbandDialog}
            keepMounted
            onClose={handleCloseDisbandDialog}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Disband Confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Are you sure to disband {guild?.name}? This action cannot be reverted
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={disbandGuild}>Yes</Button>
                <Button onClick={handleCloseDisbandDialog}>No</Button>
            </DialogActions>
        </Dialog>

        <Dialog
            open={openInviteDialog}
            keepMounted
            onClose={handleCloseInviteDialog}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Manage invites</DialogTitle>
            <DialogContent>
                <Box>
                    <Button variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{
                            gap: 1,
                        }}>
                        <Typography variant="button">Generate new Invite</Typography>
                    </Button>
                </Box>
                <Divider />
                <Box sx={{
                    py: 1
                }}>
                    <Typography>Invites</Typography>
                    <Box>
                        {invites && invites.map((invite) => (
                            <Chip label={invite.string} />
                        ))}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseInviteDialog}>Done</Button>
            </DialogActions>
        </Dialog>

        <Dialog
            open={openEditDialog}
            keepMounted
            onClose={handleCloseEditDialog}
            aria-describedby="alert-dialog-slide-description"
            key={guild._id}
        >
            <DialogTitle>Edit Guild</DialogTitle>
            <DialogContent>
                <form onSubmit={handleUpdateGuild(onUpdateGuild)}>
                    <Box sx={{
                        py: 1,
                        rowGap: 1,
                    }}>
                        <Avatar 
                            src={guildImageSrc} 
                            alt={guild.name}
                            sx={{ width: 64, height: 64}}
                        />
                        <Box sx={{
                            pb: 3
                        }}>
                            <input 
                                type="file" 
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                            <div>{guildImage && `${guildImage.name} - ${guildImage.type}`}</div>
                        </Box>
                        <TextField 
                            id="name"
                            label="Guild name"
                            fullWidth 
                            variant="outlined"
                            error={!!updateGuildErrors.name}
                            helperText={updateGuildErrors.name?.message}
                            {...registerUpdateGuild("name")}
                            defaultValue={guild.name} 
                        />
                    </Box>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseEditDialog}>Cancel</Button>
                <Button type="submit" color="warning">Submit</Button>
            </DialogActions>
        </Dialog>
    </Box>
}