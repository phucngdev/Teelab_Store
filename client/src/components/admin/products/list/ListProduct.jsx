import { Button, Empty, Input, Tabs } from "antd";
import React, { useEffect, useLayoutEffect, useState } from "react";
import ItemProduct from "./item/ItemProduct";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../../../services/product.service";
import { getAllCategory } from "../../../../services/category.service";
import ActiveProduct from "./ActiveProduct";
import UnActiveProduct from "./UnActiveProduct";

const ListProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.category.data);
  const products = useSelector((state) => state.product.data);

  return (
    <>
      <div className="bg-white rounded-lg shadow p-4 md:p-6 xl:p-8 my-6">
        <ActiveProduct
          categories={categories}
          products={products?.products?.filter((p) => p.status === 1)}
        />
        <UnActiveProduct
          categories={categories}
          products={products?.products?.filter((p) => p.status === 0)}
        />
      </div>
    </>
  );
};

export default ListProduct;
