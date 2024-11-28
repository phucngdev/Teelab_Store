# công nghệ sử dụng

- nodejs express

# package

- tạo server, routes : express
- cấu hình truy cập : cors
- xử lý api bên ngoài dự án : axios
- truy vấn và xử lý database : mysql2
- xử lý token : jsonwebtoken
- xử lý gửi mail : nodemailer
- realtime : socket.io
- đọc env : dotenv
- mã hoá và giải mã : bcrypt, crypto-js
- tạo chuỗi ngẫu nhiên : uuid
- đọc body dạng json : body-parser
- đọc cookies từ req : cookie-parser

# cấu trúc thư mục

- server
  - node_modules : lưu các thông tin thư viên, dữ liệu cần để chạy dự án
  - src : mã nguồn dự án
    - api : lưu các phiên bản v1, v2, ...
      - v1 : phiên bản v1
        - controllers : nhận req sau đó gọi đến service để xử lý và trả về res
        - middlewares : kiểm tra xác thực và quyền truy cập
        - routes : cấu hình các endpoint và controller tương ứng
        - services : xử lý req với database và trả về dữ liệu cho controller
        - utils : hàm dùng chung cho dự án
        - validations : kiểm tra dữ liệu đầu vào
    - config : config database
    - sql : lưu sql
    - app.js : config thư viện dùng trong dự án
    - server.js : tạo và chạy server
  - .env : lưu thông tin bí mật của dự án
  - .gitigrore : liệt kê các file không được push lên github
  - package-lock.json : lưu thông tin các thư viện
  - package.json : lưu thông tin dự án
