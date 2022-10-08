import { createSlice } from '@reduxjs/toolkit'


export const cartSlicer = createSlice({
    name:'cart slicer',
    initialState:{
        carts:[]
    },
    reducers:{}
})

export default cartSlicer.reducer