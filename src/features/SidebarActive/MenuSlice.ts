import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '~/app/store';

export interface CounterState {
    MenuActive: boolean;
}

const initialState: CounterState = {
    MenuActive: false,
};

export const incrementAsync = createAsyncThunk('counter/fetchCount', async (amount: number) => {
    // const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    // return response.data;
});

export const SidebarSlice = createSlice({
    name: 'sidebarActive',
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.MenuActive = !state.MenuActive;
        },
    },
});

export const { toggleMenu } = SidebarSlice.actions;

export const MenuActive = (state: RootState) => state.activeMenu.MenuActive;

export default SidebarSlice.reducer;
