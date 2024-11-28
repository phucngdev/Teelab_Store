import { Table } from "antd";
import React from "react";

const TableItems = ({ column, dataSources }) => {
  return (
    <>
      <Table columns={column} dataSource={dataSources} />
    </>
  );
};

export default TableItems;
