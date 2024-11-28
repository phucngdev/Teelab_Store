import React from "react";
import { Input } from "antd";
import { SendOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const InputBottom = ({ content, setContent, handleSubmit, handleTyping }) => {
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-start mt-5 lg:max-w-[40%] mx-auto"
      >
        <TextArea
          placeholder="message"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            handleTyping();
          }}
          autoSize
        />
        <button type="submit" className="ml-3 text-2xl hover:text-[#108ee9]">
          <SendOutlined />
        </button>
      </form>
    </>
  );
};

export default InputBottom;
