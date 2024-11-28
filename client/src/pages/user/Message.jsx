import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import socketIOClient from "socket.io-client";
import Header from "../../components/user/message/layout/Header";
import ClientMessage from "../../components/user/message/msg/ClientMessage";
import InputBottom from "../../components/user/message/layout/InputBottom";
import { useCookie } from "../../hooks/useCookie";
import { message, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import EmployeeMessage from "../../components/user/message/msg/EmployeeMessage";
import OnChangeInput from "../../components/user/message/msg/OnChangeInput";
import {
  getMessageUserChat,
  sendMessage,
} from "../../services/message.service";
import { LoadingOutlined } from "@ant-design/icons";
import ListMessage from "../../components/user/message/layout/ListMessage";

const Message = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [listMessage, setListMessage] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [content, setContent] = useState("");
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useCookie("user_info", false);
  const socketRef = useRef();
  const messagesEnd = useRef();
  const messageContainerRef = useRef(null);
  const typingTimeoutRef = useRef(null);

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

  // scroll lên top tải tin nhắn cũ
  const handleScrollToTop = async () => {
    setLoading(true);
    await dispatch(
      getMessageUserChat({ id: id, created_at: listMessage[0].created_at })
    );
    setLoading(false);
  };

  // lấy tin nhắn mới nhất
  useEffect(() => {
    socketRef.current = socketIOClient.connect(
      import.meta.env.VITE_HOST_SOCKET
    );

    socketRef.current.emit("joinRoom", { room_id: id });

    // Nhận tin nhắn từ room
    socketRef.current.on("sendMessage", (newMessage) => {
      setListMessage((prevMessages) => [...prevMessages, newMessage]);
    });

    // Nhận trạng thái người dùng đang gõ từ server
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

  return (
    <>
      <div className="container mx-auto px-2">
        <Header />
        <ListMessage
          user={user}
          isTyping={isTyping}
          pending={pending}
          messageContainerRef={messageContainerRef}
          loading={loading}
          listMessage={listMessage}
          messagesEnd={messagesEnd}
          scrollToBottom={scrollToBottom}
          handleScrollToTop={handleScrollToTop}
        />
        <InputBottom
          content={content}
          setContent={setContent}
          handleSubmit={handleSubmit}
          handleTyping={handleTyping}
        />
      </div>
    </>
  );
};

export default Message;
