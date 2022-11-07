import CartComponent from '../../components/Cart/Cart.js'
import Page from "../../components/Page.js"
export default function Cart() {
  return (
    <div>
      <Page title={"Cart - Sober"} description={"Cart in Sober App"}>
        <CartComponent />
      </Page>
    </div>
  )
}
