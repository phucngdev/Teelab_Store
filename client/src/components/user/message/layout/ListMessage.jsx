import React, { useEffect } from "react";
import ClientMessage from "../msg/ClientMessage";
import EmployeeMessage from "../msg/EmployeeMessage";
import OnChangeInput from "../msg/OnChangeInput";
import { Skeleton } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const ListMessage = ({
  user,
  isTyping,
  pending,
  messageContainerRef,
  loading,
  listMessage,
  messagesEnd,
  scrollToBottom,
  handleScrollToTop,
}) => {
  useEffect(() => {
    if (listMessage.length <= 20) scrollToBottom();
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
      {pending ? (
        <Skeleton active />
      ) : (
        <>
          <div
            ref={messageContainerRef}
            className="flex flex-col gap-2 max-h-[400px] overflow-y-auto mt-2"
          >
            {loading && (
              <div className="flex justify-center">
                <LoadingOutlined />
              </div>
            )}
            {listMessage.map((m, index) =>
              m.sender_id === user.user_id ? (
                <ClientMessage key={index} message={m.content} />
              ) : (
                <EmployeeMessage key={index} message={m.content} />
              )
            )}
            {isTyping && <OnChangeInput />}
            <div ref={messagesEnd} className=""></div>
          </div>
        </>
      )}
    </>
  );
};

export default ListMessage;
