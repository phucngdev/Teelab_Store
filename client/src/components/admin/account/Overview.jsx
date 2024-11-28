import React from "react";

const Overview = ({totalAccount, activeAccount, inactiveAccount}) => {
  return (
    <>
      <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                {totalAccount}
              </span>
              <h3 className="text-base font-normal text-gray-500">
                Tổng số tài khoản
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                {activeAccount}
              </span>
              <h3 className="text-base font-normal text-gray-500">
                Tài khoản hoạt động
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                {inactiveAccount}
              </span>
              <h3 className="text-base font-normal text-gray-500">
                Tài khoản ngừng hoạt động
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
