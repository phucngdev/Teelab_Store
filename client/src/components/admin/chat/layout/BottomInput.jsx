import {
  AudioOutlined,
  HeartOutlined,
  PictureOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Input, Tooltip } from "antd";
import React from "react";

const BottomInput = ({ content, setContent, handleSubmit, handleTyping }) => {
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="absolute left-0 right-0 bottom-0 flex items-center justify-between p-3"
      >
        <Input
          className=" text-gray-500 py-2 rounded-full "
          placeholder="Message..."
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            handleTyping();
          }}
          prefix={<SmileOutlined className="text-gray-500 text-xl" />}
          suffix={
            content == "" ? (
              <div className="flex items-center gap-2 text-gray-500 text-xl">
                <Tooltip title="">
                  <AudioOutlined />
                </Tooltip>
                <Tooltip title="">
                  <HeartOutlined />
                </Tooltip>
                <Tooltip title="">
                  <PictureOutlined />
                </Tooltip>
              </div>
            ) : (
              <>
                <button type="button" className="text-blue-500">
                  Send
                </button>
              </>
            )
          }
        />
      </form>
    </>
  );
};

export default BottomInput;
