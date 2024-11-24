import Box from "@mui/material/Box";
import { Guild, Member } from "../../shared/guild.interface";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import React from "react";
import { useSocket } from "../../context/SocketProvider";
import { OnlinePresence } from "../OnlinePresences/OnlinePresence";

interface GuildInfoProps {
    guild: Guild;
    updateGuild: (updatedAttributes: Partial<Guild>) => void;
}

export default function GuildMemberList({guild, updateGuild}: GuildInfoProps) {
    const [members, setMembers] = React.useState<Member[]>();
    const [onlineMembers, setOnlineMembers] = React.useState<Member[]>();
    const [offlineMembers, setOfflineMembers] = React.useState<Member[]>();
    const socket = useSocket();
    
    React.useEffect(() => {
        setMembers(guild.members);
    }, [guild])
    React.useEffect(() => {
        if (socket) {
            socket.on("online_members", (data) => {
                console.log(data);
                if (members && data) {
                    const onlineMemberSet = new Set(data);
                    const filteredOnlineMembers = members.filter(member => {
                        return onlineMemberSet.has(member.memberId._id);
                    })
                    console.log(guild._id);
                    const filteredOfflineMembers = members.filter(member => {
                        return !onlineMemberSet.has(member.memberId._id);
                    })
                    setOnlineMembers(filteredOnlineMembers);
                    setOfflineMembers(filteredOfflineMembers);
                }
            });
            socket.on("online_member", (data) => {
                console.log(data);
                if (members && data) {
                    const validMember = members.find(member => member._id === data);
                    if (validMember && offlineMembers && onlineMembers) {
                        // Remove the member from offlineMembers
                        setOfflineMembers(offlineMembers.filter(member => member._id !== validMember._id));
                
                        // Add the member to onlineMembers
                        setOnlineMembers([...onlineMembers, validMember]);
                    }
                }
            });
        }
    }, [socket, members])
    return <Box>
        <Typography variant="button" fontWeight="bold" sx={{mx: 1}}>Online - {onlineMembers && onlineMembers.length}</Typography>
        {onlineMembers && onlineMembers.map && onlineMembers.map((member) => (
            <Box
            key={member._id} 
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 1
            }}>
                <Box sx={{ position: "relative", width: 36, height: 36 }}>
                    <Avatar
                        src={member.memberId.profilePicture}
                        alt={member.memberId.username}
                        sx={{ width: 36, height: 36 }}
                    />
                    {member.memberId.onlinePresence && <OnlinePresence onlinePresence={member.memberId.onlinePresence}/>}
                </Box>
                <Typography>{member.memberId.username}</Typography>
            </Box>
        ))}
        <Typography variant="button" fontWeight="bold" sx={{mx: 1}}>Offline - {offlineMembers && offlineMembers.length}</Typography>
        {offlineMembers && offlineMembers.map && offlineMembers.map((member) => (
            <Box
            key={member._id} 
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 1
            }}>
                <Avatar 
                    src={member.memberId.profilePicture} 
                    alt={member.memberId.username}
                    sx={{ width: 36, height: 36}}
                />
                <Typography>{member.memberId.username}</Typography>
            </Box>
        ))}
    </Box>
}