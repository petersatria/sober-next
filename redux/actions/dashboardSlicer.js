import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
    name: 'Dashboard',
    initialState: {
        sidebar: true,
        activeSection: 'product',
        screen: null,
    },
    reducers: {
        toggleSidebar(state) {
            state.sidebar = !state.sidebar;
        },
        setActiveSection(state, actions) {
            state.activeSection = actions.payload;
        },
        setScreen(state, actions) {
            state.screen = actions.payload;
        },
        setSidebar(state, actions) {
            state.sidebar = actions.payload;
        },
    },
});

const dashboardActions = dashboardSlice.actions;
const dashboardReducers = dashboardSlice.reducer;

export { dashboardActions, dashboardReducers };
