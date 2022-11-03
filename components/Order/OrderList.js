import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import styles from "../../styles/order.module.css";
import { useRouter } from "next/router";
import Order from "./Order";
import Print from "./Print";
// import { authAxios } from '../../moduleComponents/axiosAuth';
import { formatCurrency } from "../../moduleComponents/formatCurrency";

import { token } from "../../moduleComponents/tokenAuthorization";

const OrderList = () => {
  const handlePrint = () => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    const pri = iframe.contentWindow;
    pri.document.open();
    pri.document.write(document.querySelector(".test").innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
    pri.onafterprint = () => {
      document.body.removeChild(iframe);
    };
  };

  const [orders, setOrders] = useState([{}]);
  const [zero, setZero] = useState(true);
  const [isButtonPrint, setIsButtonPrint] = useState(false);

  const router = useRouter();
  console.log("router", router);

  const tokenAuth = token();
  const config = {
    headers: {
      Authorization: `Bearer ${tokenAuth}`,
    },
  };
  const fetcher = (url) => axios.get(url, config).then((res) => res.data);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/transactionHistoryDetail/${router.query.profileId}`
      );
      console.log("orders", data);

      // console.log('from list', data.result)
      setZero(false);
      setOrders(data.result);
      setIsButtonPrint(data.result.length > 0 ? true : false);
    } catch (error) {
      console.log(error);
      // window.location.assign('/not-found-page')
    }
  };
  const generalTotal = () => {
    let price = 0;
    {
      orders &&
        orders.map((order) => {
          price += order.price * order.quantity;
        });
    }
    return price;
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="container">
      <div className="test d-none">
        <div>
          <h1
            style={{ textAlign: "center", marginTop: "50px", fontSize: "2rem" }}
          >
            Transaction List
          </h1>
          <table
            style={{ width: "100%", textAlign: "center", fontSize: "1.1rem" }}
            border={1}
            cellPadding={10}
            cellSpacing={0}
          >
            <thead
              style={{
                "-webkit-print-color-adjust": "exact",
                backgroundColor: "black",
                color: "white",
              }}
            >
              <tr>
                <th scope="col">No</th>
                <th scope="col">Product's Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Total Price</th>
              </tr>
            </thead>
            {orders &&
              orders.map((order, index) => {
                return order.products?.map((product) => {
                  return order.order?.map((orderTrans) => {
                    return (
                      <Print
                        number={index + 1}
                        product={product}
                        productTrans={order}
                        order={orderTrans}
                      />
                    );
                  });
                });
              })}
            <tfoot
              style={{
                "-webkit-print-color-adjust": "exact",
                backgroundColor: "black",
                color: "white",
              }}
            >
              <tr>
                <td colspan="4">Total Expenses</td>
                <td>{formatCurrency(generalTotal(), "Rp. ")}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div>
        <div className={`my-5 ${styles.wrapperList}`}>
          <h1 className={styles.orderTitle}>Transaction List</h1>
          {zero ? (
            <h2 className="text-center">
              No transaction yet, buy some products first!
            </h2>
          ) : (
            ""
          )}
          {orders &&
            orders.map((order) => {
              return order.products?.map((product) => {
                return order.order?.map((orderTrans) => {
                  return (
                    <Order
                      key={Math.random()}
                      product={product}
                      productTrans={order}
                      order={orderTrans}
                    />
                  );
                });
              });
            })}
        </div>
      </div>
      <button
        onClick={handlePrint}
        className={
          !isButtonPrint
            ? `${styles.printButton} d-none`
            : `${styles.printButton}`
        }
      >
        Print & Save!
      </button>
    </div>
  );
};

export default OrderList;
