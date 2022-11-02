import { useEffect, useState } from "react";
import styles from "../../styles/order.module.css";
import { formatCurrency } from "../../moduleComponents/formatCurrency";

const Print = (props) => {
  const [product, setProduct] = useState([{}]);
  const [productImage, setProductImage] = useState([]);
  const [number, setNumber] = useState([]);

  useEffect(() => {
    setProduct(props.product);
    setProductImage(props.product.images);
    setNumber(props.number);
    console.log(number);
  }, []);

  return (
    <tbody>
      <tr>
        <th scope="row">{number && number}</th>
        <td>
          <p>{product.name}</p>
        </td>
        <td align="center">
          <p>{props.productTrans.quantity}</p>
        </td>
        <td>
          <p>{formatCurrency(props.productTrans.price, "Rp. ")}</p>
        </td>
        <td>
          {formatCurrency(
            props.productTrans.price * props.productTrans.quantity,
            "Rp. "
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default Print;
