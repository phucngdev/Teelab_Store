# Công nghệ sử dụng

- Reactjs + Vite + TailwindCss

# cách cài đặ dự án mới

- xem chi tiết tại : https://tailwindcss.com/docs/guides/vite

# package

- kho lưu dữ liệu : react-redux, @reduxjs/toolkit
- xử lý form : formik, yup
- xử lý hạn chế req search : lodash, debounce
- xử lý api : axios
- realtime : socket.io-client
- xử lý up ảnh : firebase
- icon : @ant-design/icons
- component ui : antd
- điều hướng route : react-router-dom

# cấu trúc thư mục

- client
  - node_modules : lưu các thông tin thư viên, dữ liệu cần để chạy dự án
  - public : lưu ảnh tĩnh, svg
  - src : mã nguồn dự án
    - apis : config axios xử lý api
    - assets : custom icon, svg
    - components : các thành phần của 1 page, được tách nhỏ để quản lý
    - firebase : config firabase
    - hooks : custom các hook không có sẵn để sử dụng
    - layouts : các thành phần chính của 1 màn hình (public, private)
    - pages : các màn hình của web
    - redux :
      - store : kho dữ liệu chung của web
      - useSlice : xử lý dữ liệu api và lưu vào kho
    - routes : xử lý kiểm tra truy cập và layout màn hình
    - services : các hàm xử lý với api
    - utils : các hàm dùng chung của dự án
    - App.css : lưu css custom chung của dự án
    - App.jsx : config các route con của web
    - index.css : lưu các css của Tailwindcss
    - main.jsx : cấu hình bọc <App /> và render dữ liệu vào index.html
  - .env : lưu thông tin bí mật của dự án
  - index.html : file html của dự án
  - vercel.json : cấu hình route khi deploy lên vercel
  - tailwind.config.js : cấu hình, custom các file sử dụng và các thuộc tính css
  - .gitigrore : liệt kê các file không được push lên github
  - package-lock.json : lưu thông tin các thư viện
  - package.json : lưu thông tin dự án
