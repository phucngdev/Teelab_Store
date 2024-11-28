import React, { useEffect, useState } from "react";
import BoxChat from "../../components/admin/chat/BoxChat";
import { useParams } from "react-router-dom";
import Pending from "../../components/admin/animation/Pending";
import { useDispatch } from "react-redux";

const ChatBox = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);

  const fetchMessage = async () => {
    setPending(true);

    setPending(false);
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  // if (pending) return <Pending />;

  return (
    id && (
      <>
        <BoxChat />
      </>
    )
  );
};

export default ChatBox;
