import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    headerTransparant: true,
    isActive: '',
};

const headerSlicer = createSlice({
    name: 'Header Slicer',
    initialState,
    reducers: {
        setActive(state, actions) {
            state.isActive = actions.payload;
        },

        transparantHeader(state) {
            state.headerTransparant = true;
        },

        fillHeader(state) {
            state.headerTransparant = false;
        },
    },
});

const headerActions = headerSlicer.actions;

export { headerActions };
export default headerSlicer.reducer;
