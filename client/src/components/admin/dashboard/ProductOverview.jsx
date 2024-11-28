import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "antd";

const ProductOverview = () => {
  const result = useSelector(
    (state) => state.statistics.data[new Date().getMonth()]
  );
  const [data, setData] = useState(result);

  useEffect(() => {
    setData(result);
  }, [result]);

  return (
    <>
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">
          Tổng quan về sản phẩm đã bán
        </h3>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                  Bảng xếp hạng
                </th>
                <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                  Số lượng
                </th>
                <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data ? (
                data?.categories?.map((product) => (
                  <tr className="text-gray-500">
                    <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                      {product?.category}
                    </th>
                    <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                      {product?.count}
                    </td>
                    <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                      <div className="flex items-center">
                        <span className="mr-2 text-xs font-medium">
                          {product?.percentage}%
                        </span>
                        <div className="relative w-full">
                          <div className="w-full bg-gray-200 rounded-sm h-2">
                            <div
                              className="bg-cyan-600 h-2 rounded-sm"
                              style={{ width: `${product?.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
              {/* <tr className="text-gray-500">
                <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                  Referral
                </th>
                <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                  4,025
                </td>
                <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2 text-xs font-medium">24%</span>
                    <div className="relative w-full">
                      <div className="w-full bg-gray-200 rounded-sm h-2">
                        <div
                          className="bg-orange-300 h-2 rounded-sm"
                          style={{ width: "24%" }}
                        />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-gray-500">
                <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                  Direct
                </th>
                <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                  3,105
                </td>
                <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2 text-xs font-medium">18%</span>
                    <div className="relative w-full">
                      <div className="w-full bg-gray-200 rounded-sm h-2">
                        <div
                          className="bg-teal-400 h-2 rounded-sm"
                          style={{ width: "18%" }}
                        />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-gray-500">
                <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                  Social
                </th>
                <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                  1251
                </td>
                <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2 text-xs font-medium">12%</span>
                    <div className="relative w-full">
                      <div className="w-full bg-gray-200 rounded-sm h-2">
                        <div
                          className="bg-pink-600 h-2 rounded-sm"
                          style={{ width: "12%" }}
                        />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-gray-500">
                <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                  Other
                </th>
                <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                  734
                </td>
                <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2 text-xs font-medium">9%</span>
                    <div className="relative w-full">
                      <div className="w-full bg-gray-200 rounded-sm h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-sm"
                          style={{ width: "9%" }}
                        />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="text-gray-500">
                <th className="border-t-0 align-middle text-sm font-normal whitespace-nowrap p-4 pb-0 text-left">
                  Email
                </th>
                <td className="border-t-0 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4 pb-0">
                  456
                </td>
                <td className="border-t-0 align-middle text-xs whitespace-nowrap p-4 pb-0">
                  <div className="flex items-center">
                    <span className="mr-2 text-xs font-medium">7%</span>
                    <div className="relative w-full">
                      <div className="w-full bg-gray-200 rounded-sm h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-sm"
                          style={{ width: "7%" }}
                        />
                      </div>
                    </div>
                  </div>
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductOverview;
