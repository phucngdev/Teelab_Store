import React, { useEffect, useRef } from "react";
import { message } from "antd";
import ClientMessage from "../message/ClientMessage";
import EmployeeMessage from "../message/EmployeeMessage";
import OnChangeInput from "../message/OnChangeInput";
import { LoadingOutlined } from "@ant-design/icons";

const ListMessage = ({
  listMessage,
  user,
  messagesEnd,
  messageContainerRef,
  isTyping,
  handleScrollToTop,
  pennding,
  scrollToBottom,
}) => {
  useEffect(() => {
    if (listMessage.length <= 20) scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [listMessage]);

  useEffect(() => {
    const messageContainer = messageContainerRef.current;

    const handleScroll = () => {
      if (messageContainer.scrollTop === 0) {
        handleScrollToTop();
      }
    };

    if (messageContainer) {
      messageContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (messageContainer) {
        messageContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScrollToTop]);

  return (
    <>
      <div
        ref={messageContainerRef}
        className="flex flex-col max-h-[calc(100vh-71px-76px-100px)] overflow-y-auto gap-2"
      >
        {pennding && (
          <div className="flex justify-center">
            <LoadingOutlined />
          </div>
        )}
        {listMessage.map((m, index) =>
          m.sender_id === user.user_id ? (
            <EmployeeMessage key={index} message={m.content} />
          ) : (
            <ClientMessage key={index} message={m.content} />
          )
        )}
        {isTyping && <OnChangeInput />}
        <div ref={messagesEnd} className=""></div>
      </div>
    </>
  );
};

export default ListMessage;
