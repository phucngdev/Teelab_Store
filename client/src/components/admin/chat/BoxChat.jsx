import socketIOClient from "socket.io-client";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useCookie } from "../../../hooks/useCookie";
import Header from "./layout/Header";
import BottomInput from "./layout/BottomInput";
import ListMessage from "./layout/ListMessage";
import { useDispatch, useSelector } from "react-redux";
import { message, Skeleton } from "antd";
import { useParams } from "react-router-dom";
import {
  getMessageUserChat,
  sendMessage,
} from "../../../services/message.service";
import Pending from "../../user/animation/Pending";
import ChatPending from "../animation/ChatPending";

const BoxChat = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useCookie("user_info", false);
  const [content, setContent] = useState("");
  const [listMessage, setListMessage] = useState([]);
  const data_user = useSelector((state) => state.message.dataEdit);
  const [pending, setPending] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // Trạng thái đang gõ
  const socketRef = useRef();
  const messagesEnd = useRef();
  const typingTimeoutRef = useRef(null);
  const messageContainerRef = useRef(null);

  const fetchMessage = async () => {
    setPending(true);
    await dispatch(getMessageUserChat({ id: id, created_at: 0 }));
    setPending(false);
  };

  useEffect(() => {
    fetchMessage();
  }, [id]);

  const messages = useSelector((state) => state.message.dataEdit);

  const scrollToBottom = () => {
    if (messagesEnd.current && messageContainerRef.current) {
      messagesEnd.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  useEffect(() => {
    if (messages) {
      setListMessage(messages.message);
    }
  }, [isTyping, messages]);

  useEffect(() => {
    scrollToBottom();
  }, [isTyping]);

  const handleScrollToTop = async () => {
    setPending(true);
    await dispatch(
      getMessageUserChat({ id: id, created_at: listMessage[0].created_at })
    );
    setPending(false);
  };

  // lấy tin nhắn mới nhất
  useEffect(() => {
    socketRef.current = socketIOClient.connect(
      import.meta.env.VITE_HOST_SOCKET
    );

    // Tham gia vào room
    socketRef.current.emit("joinRoom", { room_id: id });

    socketRef.current.on("sendMessage", (newMessage) => {
      setListMessage((prevMessages) => [...prevMessages, newMessage]);
    });
    // Nhận thông báo người dùng khác đang gõ
    socketRef.current.on("userTyping", (data) => {
      if (user && data.user_id !== user.user_id) {
        setIsTyping(data.isTyping); // Cập nhật trạng thái gõ
      }
    });
    scrollToBottom();
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleTyping = () => {
    // Gửi thông báo đang gõ đến server
    socketRef.current.emit("userTyping", {
      user_id: user.user_id,
      room_id: id,
      isTyping: true,
    });

    // Hủy bỏ timeout trước đó nếu có
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Thiết lập timeout mới để gửi thông báo đã ngừng gõ sau 2 giây
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.emit("userTyping", {
        user_id: user.user_id,
        room_id: id,
        isTyping: false,
      });
      setIsTyping(false);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content == "") {
      message.warning("Please enter a message");
      return;
    }
    const mesSocket = {
      sender_id: user.user_id,
      room_id: id,
      content: content,
      created_at: new Date(),
    };
    const response = await dispatch(sendMessage({ id: id, data: mesSocket }));
    if (response.payload.status === 201) {
      socketRef.current.emit("sendMessage", mesSocket);
    } else {
      message.error("Send message failed");
    }
    setContent("");
  };

  if (pending) return <ChatPending />;

  return (
    <>
      <Helmet>
        <title>Message - Chats</title>
      </Helmet>
      <div className="flex-1 lg:px-3 lg:pt-4 relative">
        {pending ? (
          <Skeleton active />
        ) : (
          <>
            <Header user={messages?.user} />
            <ListMessage
              listMessage={listMessage}
              user={user}
              messagesEnd={messagesEnd}
              messageContainerRef={messageContainerRef}
              isTyping={isTyping}
              handleScrollToTop={handleScrollToTop}
              pending={pending}
              scrollToBottom={scrollToBottom}
            />
            <BottomInput
              content={content}
              setContent={setContent}
              handleSubmit={handleSubmit}
              handleTyping={handleTyping}
            />
          </>
        )}
      </div>
    </>
  );
};

export default BoxChat;
