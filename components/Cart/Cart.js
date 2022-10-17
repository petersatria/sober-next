import styles from './Cart.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchCart, deleteCart, checkoutCart } from '../../redux/actions/cartSlicer'

export default function Cart(){
    const { carts } = useSelector(state=>state.carts)
    const dispatch = useDispatch()

    console.log(carts.length>0?'ada':'ga ada', carts)

    useEffect(()=>{
        dispatch(fetchCart())
    },[])

    const onChangeHandle=(e, productId)=>{
        // dispatch(changeQty(+e.target.value,productId))

    }

    const onClickHandle=(number,productId)=>{
        // dispatch(changeQty(+number,productId))
    }
    
    const onDeleteHandle=(productId,cartId)=>{
        dispatch(deleteCart(productId,cartId))
    }

    const getTotal=()=>{
        let count = 0
        carts.forEach(el => {
            count+= el.quantity*el.product[0]?.price
        });

        return count
    }

    const onCheckoutCart=()=>{
        console.log('masuk')
        dispatch(checkoutCart({total_order:getTotal(), carts}))
    }
    
    
    return(
        <div className={styles.containerCart}>
            <div className={styles.subHeader}>
                <div className={styles.subHeaderText}>
                    Shopping Cart 
                    <div className={styles.cartNumber}>{carts.length}</div>
                </div>
            </div>
                <div className={`${styles.cartContent} mt-5`}>
                    <table className={`${styles.tableCart}`}>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            carts.length>0?
                            [...carts].sort((a,b) => (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : 0)).map((val,index)=>{
                                return(
                                    <tr key={index}>
                                        <td><img src={`${val.product[0]?.thumbnail}`} className={styles.imageTable} width={100}/><span className='m-2'>{val.product[0]?.name}</span></td>
                                        <td>$ {val.product[0]?.price}</td>
                                        <td className={styles.qtyBox}>
                                            <span style={{color:'silver'}}>QTY:</span>
                                            <div className={styles.qtyBoxInput}> 
                                                <button className={`${styles.cartChangeQtyButton} ${styles.incrementButton}`} onClick={()=>{onClickHandle(+val.quantity+1,val.productId)}}>+</button>
                                                <input className={styles.cartChangeQtyInput} onChange={(e)=>{onChangeHandle(e,val.productId)}} placeholder={val.quantity}/>
                                                <button className={`${styles.cartChangeQtyButton} ${styles.decrementButton}`} onClick={()=>{onClickHandle(+val.quantity-1,val.productId)}}>-</button>
                                            </div>
                                        </td>
                                        <td>$ {val.quantity*val.product[0]?.price}.00</td>
                                        <td><button className={styles.cartChangeQtyButton} style={{fontSize:'1rem'}} onClick={()=>{onDeleteHandle({productId:val.productId, cartId:val.cartId, size:val.size})}}>X</button></td>
                                    </tr>  
                                )
                            })
                            :
                            <div>No data</div>
                        }
                        </tbody>
                    </table>

                    <div className={`${styles.couponContainer} mt-5`}>
                        <div>Coupon</div>
                        <input placeholder='Coupon code' className={styles.inputCoupon}/>
                        <button className={styles.buttonCoupon}>APPLY COUPON</button>
                    </div>


                    <div className={`${styles.checkoutContainer} mt-5`}>
                        <div>Cart Total</div>
                        <div className={`${styles.checkoutContent}`} >
                            <div className={`${styles.subTotalCheckout}`}>
                                <div>Subtotal</div>
                                <div>$ {getTotal()}</div>
                            </div>
                            <div className={`${styles.shippingCheckout} mt-5`}>
                                <div>Shipping</div>
                                <div>Free Shiping</div>
                            </div>
                            <div className={`${styles.totalCheckout} mt-5`}>
                                <div>Total</div>
                                <div>$ {getTotal()}</div>
                            </div>
                            <button onClick={onCheckoutCart} className={`${styles.buttonCheckout} mt-5`}>Checkout</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}