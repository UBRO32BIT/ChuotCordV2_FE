import Box from "@mui/material/Box"
import Skeleton from "@mui/material/Skeleton"
import React from "react";
import { useSelector } from "react-redux";
import { GuildPartial } from "../../shared/guild.interface";
import Typography from "@mui/material/Typography";
import GuildMiniCard from "../GuildMiniCard/GuildMiniCard";

export const GuildList = () => {
    const guilds = useSelector((state: any) => state.guilds.guilds);

    React.useEffect(() => {
        console.log(guilds);
        // guilds.forEach((guild: GuildPartial, _id: string, map: Map<string, GuildPartial>) => {
        //     console.log(guild);
        // })
    }, [])
    return <Box>
        {guilds? (
                Array.from(guilds.values()).map((guild: any, index: number) => (
                    <Box key={index}>
                        <GuildMiniCard {...guild}/>
                    </Box>
                ))
            ) : (
                <Skeleton variant="rounded" width={210} height={60} />
            )}
    </Box>
}