import { createSlice } from '@reduxjs/toolkit';

const searchSlicer = createSlice({
    name: 'Search',
    initialState: {
        result: [],
    },
    reducers: {
        setResult(state, actions) {
            state.result = actions.payload;
        },
    },
});

const searchActions = searchSlicer.actions;
const searchReducers = searchSlicer.reducer;

export { searchActions, searchReducers };
