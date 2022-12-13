import React from "react";
import { useSelector } from "react-redux";
import Item from "./Item";

const PriceCard = () => {
  const { card } = useSelector((state) => state.product);
  // what to render
  let content;
  if (card.length === 0) {
    content = <p className="text-2xl text-center p-4">No item added</p>;
  }
  if (card.length > 0) {
    content = card.map((i) => <Item key={i._id} product={i} />);
  }
  return (
    <div className="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-4 xxl:col-span-4">
      <div className="bg-white py-4 px-4 shadow-md rounded-lg my-4 mx-4">
        {content}
        <div className="flex justify-center items-center text-center">
          <div className="text-xl font-semibold">
            <p>Total Item</p>
            <p className="text-5xl">0</p>
          </div>
        </div>
      </div>
      <div className="bg-white py-4 px-4 shadow-md rounded-lg my-4 mx-4">
        <div className="flex justify-center items-center text-center">
          <div className="text-xl font-semibold">
            <p>Total Price</p>
            <p className="text-5xl">0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
