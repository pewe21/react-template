import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardState {
    value: number;
}

const initialState: DashboardState = {
    value: 0,
};

const DashboardSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {

    },
});

export const { } = DashboardSlice.actions;
export default DashboardSlice.reducer;
