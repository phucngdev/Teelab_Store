import React from "react";

const NewColor = ({ showInput, handleSaveColor, handleCancel }) => {
  return (
    <>
      {showInput && (
        <div className="flex items-center gap-3 mt-3">
          <input
            type="text"
            placeholder="Nhập tên màu"
            className="p-2 border rounded-md"
          />
          <div className="flex gap-3">
            <button
              onClick={() => handleSaveColor()}
              type="button"
              className="p-2 bg-green-500 text-white rounded-md shadow-lg hover:bg-green-600"
            >
              Lưu
            </button>
            <button
              onClick={() => handleCancel()}
              type="button"
              className="p-2 bg-red-500 text-white rounded-md shadow-lg hover:bg-red-600"
            >
              Huỷ
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NewColor;
