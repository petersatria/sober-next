import { createSlice } from '@reduxjs/toolkit';

const turnInactive = (state) => {
    const stateArr = Object.entries(state);
    return Object.fromEntries(
        stateArr.map((s) => {
            if (s[0] === 'headerTransparant') return [s[0], s[1]];

            return [s[0], false];
        })
    );
};

const initialState = {
    headerTransparant: true,
    homeIsActive: false,
    shopIsActive: false,
    featureIsActive: false,
    pagesIsActive: false,
    blogIsActive: false,
};

const headerSlicer = createSlice({
    name: 'Header Slicer',
    initialState,
    reducers: {
        homeIsActive(state) {
            const newState = turnInactive(state);

            return {
                ...newState,
                homeIsActive: true,
            };
        },

        shopIsActive(state) {
            const newState = turnInactive(state);

            return {
                ...newState,
                shopIsActive: true,
            };
        },

        featureIsActive(state) {
            const newState = turnInactive(state);

            return {
                ...newState,
                featureIsActive: true,
            };
        },

        pagesIsActive(state) {
            const newState = turnInactive(state);

            return {
                ...newState,
                pagesIsActive: true,
            };
        },

        blogIsActive(state) {
            const newState = turnInactive(state);

            return {
                ...newState,
                blogIsActive: true,
            };
        },

        inActive(state) {
            const newState = turnInactive(state);

            return newState;
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
