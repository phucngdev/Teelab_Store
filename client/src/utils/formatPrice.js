const formatPrice = (price) => {
  price = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
  return price;
};
export default formatPrice;
