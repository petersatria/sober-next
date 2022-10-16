import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const url = `http://localhost:5000/`

export const cartSlicer = createSlice({
    name:'cart slicer',
    initialState:{
        carts:[]
    },
    reducers:{},
    extraReducers: (builder)=> { 
        builder.addCase(fetchCart.fulfilled, (state,action)=>{
            state.carts = action.payload.carts
        }),
        builder.addCase(addToCart.fulfilled, (state,action)=>{
            state.carts = action.payload.payload
        }),
        builder.addCase(deleteCart.fulfilled, (state,action)=>{
            console.log(action.payload)
            state.carts = action.payload
        }),
        builder.addCase(checkoutCart.fulfilled, (state,action)=>{
            state.carts = []
        })
    }
})

export default cartSlicer.reducer


export const fetchCart = createAsyncThunk('fetch/cart', async(userId='6331733bc8c65fe910662fe3', thunkAPI)=>{
    try {
        const cartUser = await axios.get(`http://localhost:5000/cart/${userId}`)
        return thunkAPI.fulfillWithValue(cartUser.data)
    } catch (error) {
        
    }
})

export const addToCart = createAsyncThunk('add/cart', async(data, thunkAPI)=>{
    let userId='6331733bc8c65fe910662fe3'
    try {
        const { carts } = thunkAPI.getState().carts
        console.log(carts)
        const findProductInCart = carts.filter((val)=>val.productId==data.productId && val.size === data.size)
        const quantity = data.quantity?+data.quantity:1

        console.log(findProductInCart)
        console.log(quantity)
        if(findProductInCart.length>0){
            console.log('sudah ada di cart')
            const newQuantity = {...findProductInCart[0], quantity:findProductInCart[0].quantity+quantity}
            const filterData = carts.filter((val)=>val.productId!==data.productId).concat(newQuantity)
            await axios.patch(`${url}cart`, {cartId:findProductInCart[0].cartId, productId:data.productId, quantity:findProductInCart[0].quantity+quantity,size:data.size})
            return thunkAPI.fulfillWithValue({payload:filterData, type:'CHANGE_QUANTITY'})

        }else{
            console.log('belom ada di cart')
            const carts = await axios.post(`${url}cart`, {userId, productId:data.productId, quantity:1, cartId:data.cartId, size:data.size})
            console.log(carts)
            return thunkAPI.fulfillWithValue({payload:carts.data.carts, type:'ADD_TO_CART'})
        }
    } catch (error) {
        console.log(error)
    }

})

export const deleteCart = createAsyncThunk('delete/cart', async(data,thunkAPI)=>{
    let userId='6331733bc8c65fe910662fe3'
    try {
        console.log(data.size, data.productId)
        const { carts } = thunkAPI.getState().carts
        console.log(carts)

        const mapCarts = carts.map((val)=>{
            if(val.productId===data.productId && val.size === data.size){
                return null
            }else{
                return val
            }
        })
        const newCarts = mapCarts.filter(val=>val!==null)
        await axios.post(`${url}delete-product-incart`, {cartId:data.cartId, productId:data.productId, size:data.size})
        return thunkAPI.fulfillWithValue(newCarts)
    } catch (error) {
        // console.log(error)
    }
})


export const checkoutCart = createAsyncThunk('checkout/cart', async(data,thunkAPI)=>{
    data.userId='6331733bc8c65fe910662fe3'
    let dataPost = {
        total_order:data.total_order,
        userId:data.userId,
        carts:data.carts
    }
    try {
        // const { data } = await axios.post(`${url}getTokenPayment`, {userId, total_order})
        // window.snap.pay(data, {
        //     onSuccess:async()=>{
        //         console.log('success')
        //         await axios.post(`${url}transactionHistoryPost`, dataPost)
        //         dispatch({
        //             type:'CHECKOUT_CART'
        //         })
    
        //         navigate('/order-list/'+userId)
        //     },
        //     onClose: function () {
        //         // muncul ketika event snap di close
        //         console.log('closed failed')
        //     }
        // })

        await axios.post(`${url}transactionHistoryPost`, dataPost)
        return thunkAPI.fulfillWithValue()

        
    } catch (error) {
        console.log(error)
    }
})