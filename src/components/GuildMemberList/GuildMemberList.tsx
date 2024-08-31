import Box from "@mui/material/Box";
import { Guild, Member } from "../../shared/guild.interface";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import React from "react";

interface GuildInfoProps {
    guild: Guild;
    updateGuild: (updatedAttributes: Partial<Guild>) => void;
}

export default function GuildMemberList({guild, updateGuild}: GuildInfoProps) {
    const [members, setMembers] = React.useState<Member[]>();
    React.useEffect(() => {
        setMembers(guild.members);
    }, [guild])
    return <Box>
        <Typography variant="button" fontWeight="bold" sx={{mx: 1}}>Offline - {members && members.length}</Typography>
        {members && members.map && members.map((member) => (
            <Box sx={{
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