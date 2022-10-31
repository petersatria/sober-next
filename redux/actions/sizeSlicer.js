import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    xs: true,
    s: false,
    m: false,
    l: false,
    xl: false,
};

const turnInactive = (state) => {
    const stateArr = Object.entries(state);
    return Object.fromEntries(stateArr.map((s) => [s[0], false]));
};

const sizeSlicer = createSlice({
    name: 'Size',
    initialState,
    reducers: {
        sActive(state) {
            const newState = turnInactive(state);

            return {
                ...newState,
                s: true,
            };
        },

        mActive(state) {
            const newState = turnInactive(state);

            return {
                ...newState,
                m: true,
            };
        },

        lActive(state) {
            const newState = turnInactive(state);

            return {
                ...newState,
                l: true,
            };
        },

        xlActive(state) {
            const newState = turnInactive(state);

            return {
                ...newState,
                xl: true,
            };
        },

        xsActive(state) {
            const newState = turnInactive(state);

            return {
                ...newState,
                xs: true,
            };
        },
    },
});

const sizeActions = sizeSlicer.actions;

export { sizeActions };
export default sizeSlicer.reducer;
