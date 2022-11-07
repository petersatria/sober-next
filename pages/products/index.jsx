import Product from "../../components/Product";
import BreadCumb from "../../components/BreadCumb";
import axios from "axios";
import Page from "../../components/Page";
import Pagination from "../../components/Pagination/Pagination";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { headerActions } from "../../redux/actions/headerSlicer";
import styles from "../../styles/Product.module.css";
import { useState } from "react";
import Link from "next/link";

const ProductList = (props) => {
  const [category, setCategory] = useState([]);
  const [filter, setFilter] = useState();

  // Set header active
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(headerActions.setActive(router.pathname));
    // setCategory([]);
  }, [category]);

  const products = props?.products;
  const allData = props?.allData;

  //   console.log("CONTEXTTTT", props.contextCat);

  const resetFilter = () => {
    setCategory([]);
  };

  // const removeCategory = (value) => {
  //   if (category.includes(value)) {
  //     setCategory(category.filter((c) => c !== category));
  //     return;
  //   }
  // };

  // Array.prototype.removeByValue = function (val) {
  //   for (var i = 0; i < this.length; i++) {
  //     if (this[i] === val) {
  //       this.splice(i, 1);
  //       i--;
  //     }
  //   }
  //   return this;
  // };

  const filterHandler = (e) => {
    // setFilter(e.target.value);

    console.log("HANDLER", e);

    //need FIX
    // pushCat(e.target.value);
    pushCat(e.target.textContent);
    pushRouter();
  };

  const pushCat = (filter) => {
    if (category.includes(filter)) {
      setCategory(category.filter((c) => c !== category));
      // category.removeByValue(filter);
      return;
    }
    category.push(filter);
    // setCategory([...category, filter]);
    console.log("INSIDE category", category);
  };

  const pushRouter = () => {
    router.push({
      pathname: router.pathname,
      query: { category }, //array
    });
  };

  console.log("router", router);
  console.log("category", category);
  // console.log("filter", filter);

  const countCategory = () => {
    const countCat = {};
    const allCat = allData?.map((product) => product.category);
    allCat?.map(function (x) {
      countCat[x] = (countCat[x] || 0) + 1;
    });

    return Object.entries(countCat).map(([key, value], i) => {
      return (
        // <div className="form-check">
        //   <input
        //     className="form-check-input "
        //     type="checkbox"
        //     name="flexRadioDefault"
        //     id={key}
        //     onClick={filterHandler}
        //     value={key}
        //   />
        //   <label
        //     className="form-check-label ms-2 text-capitalize"
        //     htmlFor={key}
        //   >
        //     {key}
        //   </label>
        // </div>
        <div
          key={key}
          className={`my-1 me-2 ${styles.tag}`}
          onClick={filterHandler}
          value={key}
        >
          {key}
        </div>
      );
    });
  };

  return (
    <Page title={"All Products"} description={"All Products"}>
      <div className="container">
        <BreadCumb
          linkTo={
            category.length
              ? `Product for: ${category.map((e) => e.toUpperCase())}`
              : "All Products"
          }
          linkRef={"/products/"}
        />
        <div className="row">
          <div className="col-12 col-lg-3 col-md-12 my-2 d-none d-md-block">
            <div className={`${styles.borderBottom}`}></div>
            <h2 className={`mb-3 mt-3 ${styles.sidebarTitle}`}>
              Filter Product
            </h2>
            <div className="d-flex flex-md-row flex-lg-column">
              {countCategory(allData)}
            </div>
            <Link href="/products">
              <button className="mt-2" onClick={resetFilter}>
                <p className={styles.small}>Reset filter</p>
              </button>
            </Link>
            <div className={`my-5 ${styles.borderBottom}`}></div>
          </div>
          <div className="col-12 col-lg-9 my-2">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 text-center">
              {/* filter cat */}
              {/* {filter
                ? allData &&
                  allData
                    .filter((product) => product.category === filter)
                    .map((product) => (
                      <Product
                        key={Math.random().toString() + product._id}
                        product={product}
                        price={product.price}
                      />
                    ))
                : products &&
                  products.map((product) => (
                    <Product
                      key={Math.random().toString() + product._id}
                      product={product}
                      price={product.price}
                    />
                  ))} */}
              {products &&
                products.map((product) => (
                  <Product
                    key={Math.random().toString() + product._id}
                    product={product}
                    price={product.price}
                  />
                ))}
            </div>
          </div>
        </div>
        {/* {filter ? null : <Pagination props={props} />} */}
        <Pagination props={props} category={category} />
      </div>
    </Page>
  );
};

export default ProductList;

export async function getServerSideProps(context) {
  const arr = [context.query.category];
  // console.log("query.category", context.query.category);

  try {
    //   const { data } = await axios.get(
    //     `http://localhost:5000/api/product?page=${
    //       context.query.page ? context.query.page : 1
    //     }${context.query.category ? `&category=${context.query.category}` : ""}`
    //   );

    //FILTER QUERY
    const page = context?.query?.page;

    const categoryQuery =
      context.query.category instanceof Array ? context.query.category : arr;

    const mapCategory =
      categoryQuery.length > 1
        ? categoryQuery?.map((c) => `&category=${c}`)
        : "";
    const removeCommaCategory =
      categoryQuery.length > 1
        ? mapCategory?.join("")
        : `&category=${categoryQuery}`;

    console.log(categoryQuery);

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}api/product?page=${
        page ? page : 1
      }${removeCommaCategory}`
    );

    const allData = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}api/product`
    );

    return {
      props: {
        products: data.result,
        maxPage: data.maxPage,
        allData: allData.data.result,
        // contextCat: context?.query?.category,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log(error);
    console.log("ERROR GAAAAAAAAAA");
    return {
      props: {
        products: [],
      }, // will be passed to the page component as props
    };
  }
}
