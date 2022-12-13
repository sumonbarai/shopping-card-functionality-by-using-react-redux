import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Heading from "./components/Heading";
import PriceCard from "./components/PriceCard";

import Product from "./components/Product";
import {
  productFailedAction,
  productRequestAction,
  productSuccessAction,
} from "./redux/product/actionCreator";

function App() {
  const { product } = useSelector((state) => state);
  const dispatch = useDispatch();
  // data fetch in local json file
  useEffect(() => {
    dispatch(productRequestAction());
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => dispatch(productSuccessAction(data)))
      .catch(dispatch(productFailedAction("there was an error")));
  }, [dispatch]);
  // sort by amount
  const sortByAmount = (a, b) => b.price - a.price;
  //  what is render
  let content;
  if (product.isLoading) {
    content = <p>Loading...</p>;
  }
  if (!product.isLoading && product.error) {
    content = <p>product.error</p>;
  }
  if (!product.isLoading && product.product.length > 0) {
    content = product.product
      .sort(sortByAmount)
      .map((prod) => <Product key={prod._id} product={prod} />);
  }

  return (
    <div className=" bg-gray-50">
      <div className="container mx-auto h-full md:h-screen">
        <Heading />
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-12 md:col-span-7 lg:col-span-8 xxl:col-span-8">
            {content}
          </div>
          <PriceCard />
        </div>
      </div>
    </div>
  );
}

export default App;
