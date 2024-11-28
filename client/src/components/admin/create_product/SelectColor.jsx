import React from "react";

const SelectColor = ({ colors, handleSelectColor, handleAddColor }) => {
  return (
    <>
      <div className="w-full">
        <h5 className="text-base font-normal mb-2 mt-5">Màu sản phẩm</h5>
        <div className="flex items-center gap-3">
          {colors.map((color) => (
            <button
              key={color.color_name}
              type="button"
              onClick={() => handleSelectColor(color)}
              className={`w-14 h-14 border border-blue-300 flex items-center justify-center rounded-md shadow-lg hover:bg-gray-200 active:bg-gray-400 `}
            >
              {color.color_name}
            </button>
          ))}
          <button
            className="w-14 h-14 flex items-center justify-center bg-[#f4f5f6] rounded-md shadow-lg hover:bg-blue-200 active:bg-blue-400"
            onClick={() => handleAddColor()}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default SelectColor;
