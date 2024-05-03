import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { GuildPartial } from "../../shared/guild.interface"

export interface IGuildsState {
    guilds: Map<string, GuildPartial>
}

const initialState : IGuildsState = {
    guilds: new Map<string, GuildPartial>()
}

export const guildsSlice = createSlice({
    name: 'guilds',
    initialState,
    reducers: {
        loadGuild: (state, action: PayloadAction<Map<string, GuildPartial>>) => {
            state.guilds = action.payload;
        },
        addGuild: (state, action: PayloadAction<GuildPartial>) => {
            state.guilds.set(action.payload._id, action.payload);
        },
        removeGuild: (state, action: PayloadAction<string>) => {
            state.guilds.delete(action.payload);
        }
    }
})

export const {loadGuild, addGuild, removeGuild} = guildsSlice.actions

export default guildsSlice.reducer;