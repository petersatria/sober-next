import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from '../../moduleComponents/cookie'
import { notifications } from '../../moduleComponents/notification'
const url = `${process.env.NEXT_PUBLIC_URL}`


export const cartSlicer = createSlice({
    name: 'cart slicer',
    initialState: {
        carts: []
    },
    reducers: {
        emptyCart: (state, action) => {
            state.carts = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            console.log(action, 'action')
            state.carts = action.payload.carts
        }),
            builder.addCase(addToCart.fulfilled, (state, action) => {
                state.carts = action.payload.payload
            }),
            builder.addCase(deleteCart.fulfilled, (state, action) => {
                console.log(action.payload)
                state.carts = action.payload
            }),
            builder.addCase(checkoutCart.fulfilled, (state, action) => {
                state.carts = []
            }),
            builder.addCase(changeQty.fulfilled, (state, action) => {
                state.carts = action.payload
            })
    }
})

export default cartSlicer.reducer


export const fetchCart = createAsyncThunk('fetch/cart', async (data, thunkAPI) => {
    const token = JSON.parse(getCookie('userCookie'))
    let userId = '0'
    if (token) {
        userId = token.id
    }

    try {
        if (!token) {
            return thunkAPI.fulfillWithValue({ carts: [] })
        }


        const cartUser = await axios.get(`http://localhost:5000/cart/${userId}`, {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        })
        return thunkAPI.fulfillWithValue(cartUser.data)
    } catch (error) {
        console.log(error)
    }
})

export const addToCart = createAsyncThunk('add/cart', async (data, thunkAPI) => {
    const token = JSON.parse(getCookie('userCookie'))
    let userId = '0'
    if (token) {
        userId = token.id
    }
    try {
        const { carts } = thunkAPI.getState().carts
        const findProductInCart = carts.filter((val) => val.productId == data.productId && val.size === data.size)
        const quantity = data.quantity ? +data.quantity : 1

        console.log(findProductInCart)
        console.log(quantity)
        if (findProductInCart.length > 0) {
            console.log('sudah ada di cart')
            const newQuantity = { ...findProductInCart[0], quantity: findProductInCart[0].quantity + quantity }
            const filterData = carts.filter((val) => val.productId !== data.productId).concat(newQuantity)
            await axios.patch(`${url}cart`, { cartId: findProductInCart[0].cartId, productId: data.productId, quantity: findProductInCart[0].quantity + quantity, size: data.size }, {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            })
            notifications({ statusCode: 200, message: "success add to cart" })
            return thunkAPI.fulfillWithValue({ payload: filterData, type: 'CHANGE_QUANTITY' })

        } else {
            console.log('belom ada di cart')
            const carts = await axios.post(`${url}cart`, { userId, productId: data.productId, quantity: 1, cartId: data.cartId, size: data.size }, {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            })
            notifications({ statusCode: 200, message: "success add to cart" })
            return thunkAPI.fulfillWithValue({ payload: carts.data.carts, type: 'ADD_TO_CART' })
        }
    } catch (error) {
        notifications({ statusCode: 400, message: "failed add to cart" })
        console.log(error)
    }

})

export const deleteCart = createAsyncThunk('delete/cart', async (data, thunkAPI) => {
    const token = JSON.parse(getCookie('userCookie'))
    let userId = '0'
    if (token) {
        userId = token.id
    }
    try {
        console.log(data.size, data.productId)
        const { carts } = thunkAPI.getState().carts
        console.log(carts)

        const mapCarts = carts.map((val) => {
            if (val.productId === data.productId && val.size === data.size) {
                return null
            } else {
                return val
            }
        })
        const newCarts = mapCarts.filter(val => val !== null)
        await axios.post(`${url}delete-product-incart`, { cartId: data.cartId, productId: data.productId, size: data.size }, {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        })
        return thunkAPI.fulfillWithValue(newCarts)
    } catch (error) {
        // console.log(error)
    }
})


export const checkoutCart = createAsyncThunk('checkout/cart', async (data, thunkAPI) => {
    const token = JSON.parse(getCookie('userCookie'))
    let userId = '0'
    if (token) {
        userId = token.id
    }
    let dataPost = {
        total_order: data.total_order,
        userId: userId,
        carts: data.carts
    }
    try {
        const dataToken = await axios.post(`${url}getTokenPayment`, {userId, total_order:dataPost.total_order}, {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        })
        window.snap.pay(dataToken.data, {
            onSuccess:async()=>{
                console.log('success push')
                await axios.post(`${url}transactionHistoryPost`, dataPost, {
                    headers: {
                        Authorization: `Bearer ${token.token}`
                    }
                })

                // data.navigate.push(`profile/${userId}/orders`)
                return thunkAPI.fulfillWithValue(data.navigate)
            },
            onClose: function () {
                // muncul ketika event snap di close
                console.log('closed failed')
            }
        })


        // await axios.post(`${url}transactionHistoryPost`, dataPost, {
        //     headers: {
        //         Authorization: `Bearer ${token.token}`
        //     }
        // })
        // data.navigate.push(`/`)
        // data.navigate.push(`/order-list/'${userId}`)
        // return thunkAPI.fulfillWithValue()
    } catch (error) {
        console.log(error)
    }
})


export const changeQty = createAsyncThunk('changeQTY/cart', async ({ qty, productId }, thunkAPI) => {
    const token = JSON.parse(getCookie('userCookie'))
    let userId = '0'
    if (token) {
        userId = token.id
    }
    try {
        const { carts } = thunkAPI.getState().carts
        const findProductInCart = carts.filter((val) => val.productId === productId)

        const newQuantity = { ...findProductInCart[0], quantity: qty }
        const filterData = carts.filter((val) => val.productId !== productId).concat(newQuantity)
        console.log(filterData, 'filter')


        await axios.patch(`${url}cart`, { cartId: findProductInCart[0].cartId, productId: productId, quantity: qty }, {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        })
        return thunkAPI.fulfillWithValue(filterData)
        // dispatch({
        //     type:'CHANGE_QUANTITY',
        //     payload:filterData
        // })

    } catch (error) {
        console.log(error)
    }
})

export const { emptyCart } = cartSlicer.actions;
