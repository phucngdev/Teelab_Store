import moment from "moment";

export const formatTime = (timestamp) => {
  const now = moment();
  const messageTime = moment(timestamp);

  const diffInDays = now.diff(messageTime, "days");

  if (diffInDays === 0) {
    return `Hôm nay lúc ${messageTime.format("HH:mm")}`;
  } else if (diffInDays === 1) {
    return `Hôm qua lúc ${messageTime.format("HH:mm")}`;
  } else {
    return messageTime.format("DD/MM/YYYY [lúc] HH:mm");
  }
};
