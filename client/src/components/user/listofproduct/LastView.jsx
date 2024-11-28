import React, { useState } from "react";
import ItemProduct from "../product/ItemProduct";

const LastView = () => {
  const [lastview, setLastview] = useState(() => {
    const lastview = JSON.parse(localStorage.getItem("lastview"));
    return lastview || [];
  });

  return (
    <>
      {lastview.length > 0 && (
        <div className="container mx-auto mb-[50px]">
          <h3>Sản phẩm đã xem</h3>
          <div className="container px-2 md:px-0 mx-auto grid grid-cols-2 gap-x-5 gap-y-7 xl:grid-cols-4 md:grid-cols-3">
            {lastview?.map((product) => (
              <ItemProduct product={product} key={product?._id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default LastView;
