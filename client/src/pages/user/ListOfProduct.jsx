import React, { useEffect, useState } from "react";
import SideBar from "../../components/user/listofproduct/SideBar";
import { Helmet } from "react-helmet";
import LastView from "../../components/user/listofproduct/LastView";
import ListProducts from "../../components/user/listofproduct/ListProducts";
import ComingSoon from "../../components/user/listofproduct/ComingSoon";
import Filter from "../../components/user/listofproduct/Filter";

const ListOfProduct = ({ category }) => {
  return (
    <>
      <Helmet>
        <title>{category} | TEELAB</title>
      </Helmet>
      <div className="container mx-auto flex gap-7 mt-16 md:mt-0">
        <SideBar />
        {/* <ComingSoon /> */}
        {/* <Filter /> */}
        <ListProducts category={category} />
      </div>
      <LastView />
    </>
  );
};

export default ListOfProduct;
