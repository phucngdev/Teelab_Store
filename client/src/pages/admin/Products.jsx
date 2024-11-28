import React, { useEffect, useState } from "react";
import ListProduct from "../../components/admin/products/list/ListProduct";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../services/category.service";
import { getAllProduct } from "../../services/product.service";
import Overview from "../../components/admin/products/Overview";
import Pending from "../../components/admin/animation/Pending";

const Products = () => {
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);

  const fetchData = async () => {
    setPending(true);
    const promises = [
      dispatch(getAllProduct({ page: 0, limit: 0 })),
      dispatch(getAllCategory()),
    ];
    await Promise.allSettled(promises);
    setPending(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const products = useSelector((state) => state.product.data);

  if (pending) return <Pending />;

  return (
    <>
      <Overview
        totalProduct={products.products?.length}
        totalActive={products.products?.filter((p) => p.status === 1).length}
      />
      <ListProduct />
    </>
  );
};

export default Products;
