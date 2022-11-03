import { createSlice } from '@reduxjs/toolkit';

const searchSlicer = createSlice({
    name: 'Search',
    initialState: {
        result: [],
        searchValue: '',
        statusCode: null,
    },
    reducers: {
        setResult(state, actions) {
            state.result = actions.payload;
        },
        setSearchValue(state, actions) {
            state.searchValue = actions.payload;
        },
        setStatusCode(state, actions) {
            state.statusCode = actions.payload;
        },
    },
});

const searchActions = searchSlicer.actions;
const searchReducers = searchSlicer.reducer;

export { searchActions, searchReducers };
