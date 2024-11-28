import React from "react";

const OperatingCost = () => {
  return (
    <>
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Chi phí vận hành
            </h3>
            <span className="text-base font-normal text-gray-500">
              Danh sách các giao dịch mới nhất
            </span>
          </div>
          <div className="flex-shrink-0">
            <a
              href="#"
              className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2"
            >
              Xem tất cả
            </a>
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="overflow-x-auto rounded-lg">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Giao dịch
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Thời gian
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Số lượng
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                        Chi phí <span className="font-semibold">mặt bằng</span>
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        23-06-2024
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        -20,000,000đ
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                        Chi phí{" "}
                        <span className="font-semibold">
                          dịch vụ mạng, điện & nước
                        </span>
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        23-06-2024
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        -3,300,000đ
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                        Chi phí{" "}
                        <span className="font-semibold">
                          marketing & quảng cáo
                        </span>
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        18-06-2024
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        -1,200,000đ
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                        Chi phí <span className="font-semibold">Nhân sự</span>
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        10-06-2024
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        -105,200,000đ
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                        Thanh toán hoá đơn{" "}
                        <span className="font-semibold">hình in</span>
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        08-06-2024
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        -$2300
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                        Thanh toán <span className="font-semibold">Thuế</span>
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        29-05-2024
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        -$560
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                        Thanh toán hoá đơn{" "}
                        <span className="font-semibold">vải cotton</span>
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        20-05-2024
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        -$1437
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OperatingCost;
